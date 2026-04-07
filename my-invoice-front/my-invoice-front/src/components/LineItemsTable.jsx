function LineItemsTable({ items, currency }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="line-items">
      <h3 className="section-title">Line Items</h3>
      <table className="items-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity ?? "—"}</td>
              <td>{item.unit_price ? `${currency} ${item.unit_price}` : "—"}</td>
              <td>{item.line_total ? `${currency} ${item.line_total}` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LineItemsTable;