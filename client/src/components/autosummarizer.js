import React, { useState } from 'react';

const autosummarizer = () => {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSummary('');
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      if (!res.ok) throw new Error('Failed to summarize');
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <h2>Auto Summarizer</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={6}
          style={{ width: '100%', marginBottom: 12 }}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Paste text to summarize..."
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {summary && (
        <div style={{ marginTop: 24 }}>
          <h4>Summary:</h4>
          <div style={{ background: '#f3f3f3', padding: 12, borderRadius: 4 }}>{summary}</div>
        </div>
      )}
    </div>
  );
};

export default autosummarizer;