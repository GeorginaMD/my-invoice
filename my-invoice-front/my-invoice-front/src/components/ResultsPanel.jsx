import SummaryCard from './SummaryCard';
import AnomalyAlert from './AnomalyAlert';
import ExtractedFields from './ExtractedFields';
import LineItemsTable from './LineItemsTable';
import { useState } from 'react';

function ResultsPanel({ result }) {
const [showRaw, setShowRaw] = useState(false);

return (
<section className='results-panel'>
{/* Summary at the top */}
<SummaryCard result={result} />

  {/* Anomaly alert - prominent if issues exist */}
  <AnomalyAlert anomalies={result.anomalies} />

  {/* Extracted structured fields */}
  <ExtractedFields result={result} />

  {/* Line items table */}
  <LineItemsTable
    items={result.line_items}
    currency={result.currency}
  />

  {/* Visual only - 'send to database button' */}
  <div className='database-section'>
    <button
      className='database-btn'
      onClick={() => alert('Invoice saved to internal database')}
    >
      Send to Internal Database
    </button>
    <span className='database-note'>
      Stores structured invoice data for reporting and analytics
    </span>
  </div>

  {/* Raw JSON toggle - for technical viewers */}
  <div className='raw-section'>
    <button
      className='raw-toggle'
      onClick={() => setShowRaw(!showRaw)}
    >
      {showRaw ? 'Hide' : 'Show'} Raw JSON
    </button>
    {showRaw && (
      <pre className='raw-json'>
        {JSON.stringify(result, null, 2)}
      </pre>
    )}
  </div>
</section>

);
}

export default ResultsPanel;