const samples = [
    {
        id: 'sample-invoice-nl',
        label: 'Dutch invoice',
    },
    {
        id: 'sample-invoice-es',
        label: 'Spanish invoice',
    },
    {
        id: 'sample-invoice-fr',
        label: 'French invoice',
    },
];

function InputPanel({
    mode, setMode, inputText, setInputText, loading, loadingSample, onAnalyzeText, onAnalyzeSample, onReset, hasResult,
}) {
    return (
        <section className='input-panel'>


            {/* Sample buttons */}
            <div className='samples-section'>
                <p className='samples-label'>Load a sample invoice - for demo purpose - you can load a simple invoice to see the analysis in action. Each sample demonstartes a different language, scenario and invoice format.</p>
                <div className='samples-row'>
                    {samples.map((sample) => (
                        <button key={sample.id} className={`sample-btn ${loadingSample === sample.id ? 'sample-btn-loading' : ''}`} onClick={() => onAnalyzeSample(sample.id)} disabled={loading || loadingSample !== null}>
                            <span className='sample-btn-label'>{loadingSample === sample.id ? 'Analyzing...' : sample.label}</span>
                            {/* <span className='sample-btn-desc'>{sample.description}</span> */}
                        </button>
                    ))}
                </div>
            </div>


            {/* Mode tabs */}
            <div className='mode-tabs'>
                    <button className={`tab ${mode === 'text'} ? 'tab-active' : ''}`} onClick={() => setMode('text')}>
                        Paste text
                    </button>
                    <button className={`tab ${mode === 'pdf'} ? 'tab-active' : ''}`} onClick={() => setMode('pdf')}>
                        Upload PDF
                    </button>
            </div>


            {/* Text mode */}
            {mode === 'text' && (
                <div className='text-mode'>
                    <textarea className='invoice-textarea' placeholder='Paste your invoice text here...' value={inputText} onChange={(e) => setInputText(e.target.value)} rows={12}></textarea>
                </div>
            )}


            {/* PDF mode - visual only */}
            {mode === 'pdf' && (
                <div className='pdf-mode'>
                    <div className='dropzone'>
                        <span className='dropzone-icon'>🧾</span>
                        <p className='dropzone-text'>Drag and drop your PDF invoice here</p>
                        <p className='dropzone-subtext'>PDF upload coming soon - use sample invoices or paste text above.</p>
                    </div>
                </div>
            )}


            {/* Action buttons */}
            <div className='action-row'>
                {hasResult && <button className='reset-btn' onClick={onReset}>
                    Analyze another invoice
                </button>}
                {mode === 'text' && <button className='analyze-btn' onClick={onAnalyzeText} disabled={loading || !inputText.trim()}>
                    {loading ? 'Analyzing...' : 'Analyze Invoice'}
                </button>}
            </div>

        </section>
    )
}

export default InputPanel;