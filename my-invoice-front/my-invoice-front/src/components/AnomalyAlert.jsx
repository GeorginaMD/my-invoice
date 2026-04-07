function AnomalyAlert({ anomalies }) {
  if (!anomalies || anomalies.length === 0) {
    return (
      <div className="anomaly-clear">
        No anomalies detected
      </div>
    );
  }

  return (
    <div className="anomaly-alert">
      <h3 className="anomaly-title">Anomalies Detected!!!</h3>
      <ul className="anomaly-list">
        {anomalies.map((anomaly, index) => (
          <li key={index} className="anomaly-item">{anomaly}</li>
        ))}
      </ul>
    </div>
  );
}

export default AnomalyAlert;