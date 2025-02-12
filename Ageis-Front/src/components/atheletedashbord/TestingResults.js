import React, { useState } from 'react';

const TestingResults = () => {
  const testResults = [
    {
      testType: 'Blood Test',
      outcome: 'Negative',
      testDate: '2024-09-15',
      testLocation: 'New York, USA',
      flagged: false,
      labReport: 'Report1.pdf',
    },
    {
      testType: 'Urine Test',
      outcome: 'Positive',
      testDate: '2024-09-30',
      testLocation: 'Los Angeles, USA',
      flagged: true,
      labReport: 'Report2.pdf',
    },
    {
      testType: 'Blood Test',
      outcome: 'Inconclusive',
      testDate: '2024-10-10',
      testLocation: 'London, UK',
      flagged: false,
      labReport: 'Report3.pdf',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Testing Results</h1>

        {testResults.map((result, index) => (
          <div key={index} style={styles.resultCard} className="hover-effect">
            <div style={styles.resultHeader}>
              <h2 style={styles.testType}>{result.testType}</h2>
              <p style={styles.outcome(result.outcome)}>{result.outcome}</p>
            </div>
            <div style={styles.resultDetails}>
              <p><strong>Date:</strong> {result.testDate}</p>
              <p><strong>Location:</strong> {result.testLocation}</p>
              {result.flagged && (
                <p style={styles.flaggedText}><strong>Flagged for irregularities</strong></p>
              )}
              <a href={`/files/${result.labReport}`} target="_blank" rel="noopener noreferrer" style={styles.downloadLink}>
                <strong>Download Lab Report ({result.labReport})</strong>
              </a>
            </div>
            <hr style={styles.divider} />
          </div>
        ))}

        <div style={styles.downloadSection}>
          <button style={styles.downloadButton}>Download All PDFs</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f3f4f6',
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '900px',
    marginBottom: '30px',
    transition: 'all 0.3s ease-in-out',
  },
  header: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  },
  resultCard: {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease', // Smooth hover effect
    cursor: 'pointer',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testType: {
    fontSize: '22px',
    fontWeight: '500',
    color: '#333',
  },
  outcome: (outcome) => ({
    fontSize: '18px',
    fontWeight: '500',
    color: outcome === 'Negative' ? 'green' : outcome === 'Positive' ? '#89292e' : 'orange',
  }),
  resultDetails: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#555',
  },
  flaggedText: {
    color: '#89292e',
    fontWeight: '600',
  },
  downloadLink: {
    color: '#203c5c',
    fontWeight: '600',
    textDecoration: 'none',
    marginTop: '10px',
  },
  divider: {
    margin: '20px 0',
    borderColor: '#e5e7eb',
  },
  downloadSection: {
    textAlign: 'center',
  },
  downloadButton: {
    backgroundColor: '#203c5c',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '200px',
    transition: 'all 0.3s ease-in-out', // Smooth transition for button hover effect
  },
};

// Add this CSS for hover effect
const css = `
  .hover-effect:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
    transform: translateY(-5px); /* Slight lift effect */
  }
`;

// Inject styles dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default TestingResults;