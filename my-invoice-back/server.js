import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { PDFParse } from "pdf-parse";
import path from "path";
import fs from "fs";
import { readFileSync } from "fs";

dotenv.config();

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer config - store file in memory, not on disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

// The system prompt - the heart of the application
const SYSTEM_PROMPT = `You are an invoice processing assistant for
a distribution company operating across different countries in Europe.

When given invoice text, extract the following fields and return ONLY
a valid JSON object with no additional text, markdown, or code blocks.

{
"supplier_name": "string or null",
"invoice_number": "string or null",
"invoice_date": "string or null",
"due_date": "string or null",
"po_reference": "string or null",
"currency": "string or null",
"subtotal": "number or null",
"tax_amount": "number or null",
"tax_rate": "string or null",
"total_amount": "number or null",
"line_items": [
{
"description": "string",
"quantity": "number or null",
"unit_price": "number or null",
"line_total": "number or null"
}
],
"anomalies": ["array of strings describing any issues found"],
"summary": "string - 2 natural language sentences summarizing the invoice",
"detected_language": "full language name in English"
}

ANOMALY DETECTION - flag any of the following:

- Subtotal + tax does not equal the total amount (check the math precisely)
- Missing required fields such as invoice number, date, supplier name, or total
- Missing tax information
- Due date is before invoice date
- Line items do not add up to the subtotal

CRITICAL LANGUAGE INSTRUCTION:

- Detect the language of the invoice
- Write the summary field in that same language
- Write all anomaly descriptions in that same language
- Always write detected_language in English`;

// Helper function to call OpenAI API
async function analyzeWithOpenAI(invoiceText) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.1,
    max_tokens: 1500,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Please analyze this invoice and extract all required information:\n\n${invoiceText}`,
      },
    ],
  });
  const content = response.choices[0].message.content;

  // Parse the JSON response safely
  try {
    return JSON.parse(content);
  } catch {
    // If parsing fails, try to extract JSON from the response
    const jsonMatch = content.match(/{[\s\S]*}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    throw new Error("Failed to parse AI response as JSON");
  }
}

// Route 1 - Analyze plain text invoice
app.post("/analyze/text", async (req, res) => {
  try {
    const { invoiceText } = req.body;

    if (!invoiceText || invoiceText.trim().length === 0) {
      return res.status(400).json({ error: "Invoice text is required" });
    }

    const result = await analyzeWithOpenAI(invoiceText);
    res.json(result);
  } catch (error) {
    console.error("Error analyzing text invoice:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route 2 - Analyze PDF invoice
app.post("/analyze/pdf", upload.single("invoice"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required" });
    }

    // Extract text from PDF buffer
    const pdfData = await pdf(req.file.buffer);
    const invoiceText = pdfData.text;

    if (!invoiceText || invoiceText.trim().length === 0) {
      return res.status(400).json({ error: "Could not extract text from PDF" });
    }

    const result = await analyzeWithOpenAI(invoiceText);
    res.json(result);
  } catch (error) {
    console.error("Error analyzing PDF invoice:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route 3 - Analyze sample invoice by name
app.post("/analyze/sample/:sampleName", async (req, res) => {
  try {
    const { sampleName } = req.params;
    const allowedSamples = [
      "sample-invoice-nl",
      "sample-invoice-es",
      /* "sample-invoice-fr", */
    ];

    if (!allowedSamples.includes(sampleName)) {
      return res.status(400).json({ error: "Invalid sample name" });
    }

    // Read the PDF from the frontend public folder
    const pdfPath = path.join(
      __dirname,
      "..",
      "my-invoice-front",
      "public",
      `${sampleName}.pdf`,
    );
    const pdfBuffer = fs.readFileSync(pdfPath);
    const parser = new PDFParse();
    const pdfData = await parser.parseBuffer(pdfBuffer);
    const invoiceText = pdfData.text;

    const result = await analyzeWithOpenAI(invoiceText);
    res.json(result);
  } catch (error) {
    console.error("Error analyzing sample invoice:", error);
    res.status(500).json({ error: error.message });
  }
});

// server check route
app.get("/server-check", (req, res) => {
  res.json({ status: "ok", message: "Invoice Intelligence API running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
