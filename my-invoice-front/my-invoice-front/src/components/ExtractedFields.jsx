function ExtractedFields({ result }) {
  const fields = [
    { label: 'Invoice Number', value: result.invoice_number },
    { label: 'Invoice Date', value: result.invoice_date },
    { label: 'Due Date', value: result.due_date },
    { label: 'PO Reference', value: result.po_reference },
    { label: 'Supplier', value: result.supplier_name },
    { label: 'Currency', value: result.currency },
    { label: 'Tax Rate', value: result.tax_rate },
    { label: 'Subtotal', value: result.subtotal ? `${result.currency} ${result.subtotal?.toLocaleString()}` : null },
    { label: 'Tax Amount', value: result.tax_amount ? `${result.currency} ${result.tax_amount?.toLocaleString()}` : null },
    { label: 'Total Amount', value: result.total_amount ? `${result.currency} ${result.total_amount?.toLocaleString()}` : null },
  ];

  return (
    <div className='extracted-fields'>
      <h3 className='section-title'>Extracted Data</h3>
      <div className='fields-grid'>
        {fields.map((field) => (
          <div key={field.label} className='field-item'>
            <span className='field-label'>{field.label}</span>
            <span className={`field-value ${!field.value ? 'field-empty' : ''}`}>
              {field.value || 'Not found'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
  export default ExtractedFields;