import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BalanceCard = () => {
  const [deepgramData, setDeepgramData] = useState(null);
  const [grokData, setGrokData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = async (attempt = 0) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching balance data (attempt ${attempt + 1})...`);

      const [dgRes, grokRes] = await Promise.all([
        axios.get('http://localhost:5000/api/deepgram-balance'),
        axios.get('http://localhost:5000/api/grok-balance')
      ]);

      setDeepgramData(dgRes.data);
      setGrokData(grokRes.data);
      setRetryCount(0);
      console.log('Balance data fetched successfully');
    } catch (err) {
      console.error('Error fetching balances:', err);
      
      const maxRetries = 3;
      if (attempt < maxRetries) {
        const backoffDelay = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${backoffDelay}ms...`);
        setRetryCount(attempt + 1);
        setTimeout(() => fetchData(attempt + 1), backoffDelay);
      } else {
        setError(
          err.response?.data?.error || 
          'Failed to fetch balance data after several attempts. Ensure the backend is running.'
        );
      }
    } finally {
      if (attempt === 0 || error || (deepgramData && grokData)) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && retryCount === 0) return <div className="loading">Loading balance information...</div>;
  
  return (
    <div className="balance-container">
      {error && (
        <div className="error-banner">
          <div className="error">{error}</div>
          <button onClick={() => fetchData(0)} className="retry-button">Retry Now</button>
        </div>
      )}
      
      {retryCount > 0 && !error && (
        <div className="retry-status">
          Retrying... (Attempt {retryCount})
        </div>
      )}

      <div className="card">
        <h2 className="section-title">DEEPGRAM BALANCE</h2>
        <div className="info-group">
          <div className="info-row">
            <span className="label">Status:</span>
            <span className="value-text">{deepgramData?.status || 'Connected'} ✅</span>
          </div>
          <div className="info-row">
            <span className="label">Project Name:</span>
            <span className="value-text">{deepgramData?.projectName || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="label">Project ID:</span>
            <span className="value-text small">{deepgramData?.projectId || 'N/A'}</span>
          </div>
          <div className="info-row balance-row">
            <span className="label">Balance:</span>
            <span className="value-text highlight">{deepgramData?.balance || 'Available'}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">GROK BALANCE</h2>
        <div className="info-group">
          <div className="info-row main-balance">
            <span className="label large">Credits Remaining:</span>
            <span className="value-text large highlight">{grokData?.balance ?? '100'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
