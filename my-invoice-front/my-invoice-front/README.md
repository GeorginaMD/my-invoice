# Invoice analyzer

An AI-powered invoice processing tool that extracts structured data from invoices, detects anomalies, and supports multiple European languages — built for distribution companies managing cross-border operations.

**Live demo → [my-invoice-beige.vercel.app](https://my-invoice-beige.vercel.app)**

## What it does

Upload a PDF invoice or paste raw invoice text, and the app will:

- Extract key fields: supplier, invoice number, dates, amounts, line items, tax
- Detect anomalies such as math errors, missing fields, or due dates before invoice dates
- Identify the invoice language and return the summary and anomalies in that language
- Redact sensitive data (IBANs, phone numbers, emails) before sending to the AI

## Tech stack

- Frontend | React + Vite |
- Backend | Node.js + Express (serverless) |
- AI | OpenAI GPT-4o |
- PDF parsing | @cedrugs/pdf-parse |
- Deployment | Vercel |

## Features

- **Text input** — paste any invoice text directly
- **PDF upload** — upload a PDF invoice (up to 10MB)
- **Sample invoices** — try with built-in Dutch, Spanish and French invoices
- **Anomaly detection** — flags math discrepancies, missing fields, and date issues
- **Multilingual** — detects invoice language and responds in kind
- **Data privacy** — IBANs, emails, and phone numbers are redacted before AI processing

## Running locally

### Prerequisites
- Node.js 18+
- An OpenAI API key

### Backend
```bash
cd my-invoice-back
npm install
# create .env with: OPENAI_API_KEY=your_key_here
node server.js
```

### Frontend
```bash
cd my-invoice-front/my-invoice-front
npm install
# create .env with: VITE_API_URL=http://localhost:3000
npm run dev
```

## Deployment

Deployed on Vercel as a monorepo. The Express backend runs as a Vercel serverless function under `/api`. The frontend is built with Vite and served as a static site.

Environment variables required in Vercel dashboard:
- `OPENAI_API_KEY`
- `VITE_API_URL` (empty string for production)


## Author
https://github.com/georginamd