function SummaryCard({ result }) {
    return (
        <div className="summary-card">
            <div className="summary-header">
                <span className="language-badge">{result.detected_language}</span>
                <h2 className="summary-title">Invoice Summary</h2>
            </div>
            <p className="summary-text">{result.summary}</p>
            <div className="summary-highlights">
                <div className="highlight">
                    <span className="highlight-label">Supplier</span>
                    <span className="highlight-value">{result.supplier_name || "—"}</span>
                </div>
                <div className="highlight">
                    <span className="highlight-label">Invoice Date</span>
                    <span className="highlight-value">{result.invoice_date || "—"}</span>
                </div>
                <div className="highlight">
                    <span className="highlight-label">Total Amount</span>
                    <span className="highlight-value total">
                        {result.currency} {result.total_amount?.toLocaleString() || "—"}
                    </span>
                </div>
            </div>
        </div>
  );
}
export default SummaryCard;