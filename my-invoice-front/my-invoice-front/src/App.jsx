import { useState } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel'; 
import ResultsPanel from './components/ResultsPanel';
import './index.css';
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [mode, setMode] = useState('text');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSample, setLoadingSample] = useState(null);
  const [error, setError] = useState(null);


const handleAnalyzeText = async () => {
  if (!inputText.trim()) return;
  setLoading(true);
  setError(null);
  setResult(null);

  try {
    const response = await fetch('http://localhost:3000/analyze/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceText: inputText }),
    });

    if (!response.ok) throw new Error('Analysis failed');
    
    const data = await response.json();
    setResult(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const handleAnalyzeSample = async (sampleName) => {
  setLoadingSample(sampleName);
  setError(null);
  setResult(null);
  setMode('text');

  try {
    const response = await fetch(`${API_URL}/analyze/sample/${sampleName}`, {
      method: 'POST',
    });

    if (!response.ok) throw new Error('Analysis failed');
    
    const data = await response.json();
    setResult(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoadingSample(null);
  }
};

const handleReset = () => {
  setInputText('');
  setResult(null);
  setError(null);
};

  return (
    <div className='app'>
      <Header />
      <main className='main'>
        <InputPanel
          mode={mode}
          setMode={setMode}
          inputText={inputText}
          setInputText={setInputText}
          loading={loading}
          loadingSample={loadingSample}
          onAnalyzeText={handleAnalyzeText}
          onAnalyzeSample={handleAnalyzeSample}
          onReset={handleReset}
          hasResult={!!result}
        />
        {error && <div className='error-box'>{error}</div>}
        {result && <ResultsPanel result={result} />}
      </main>
      <footer className='footer'>
        <p className='footer-p'>Do not upload real invoices containing sensitive business data. Use sample invoices for demonstration purposes only.</p>
      </footer>
    </div>
  )
}

export default App
