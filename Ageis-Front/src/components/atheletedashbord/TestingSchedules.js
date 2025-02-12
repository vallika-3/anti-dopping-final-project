import React, { useState } from 'react';

const TestingSchedules = () => {
  // Sample data for testing schedules
  const [tests] = useState([
    {
      id: 1,
      testType: 'Blood Test',
      testDate: '2024-12-01',
      testTime: '10:00 AM',
      location: 'New York, USA',
      type: 'Scheduled',
    },
    {
      id: 3,
      testType: 'Blood Test',
      testDate: '2024-12-15',
      testTime: '9:00 AM',
      location: 'London, UK',
      type: 'Scheduled',
    },
  ]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Completed Tests</h1>

        {tests.map((test) => (
          <div key={test.id} style={styles.testCard} className="hover-card">
            <div style={styles.testHeader}>
              <h2 style={styles.testType}>{test.testType}</h2>
            </div>
            <div style={styles.testDetails}>
              <p><strong>Date:</strong> {test.testDate}</p>
              <p><strong>Time:</strong> {test.testTime}</p>
              <p><strong>Location:</strong> {test.location}</p>
              <p><strong>Test Type:</strong> {test.type}</p>
            </div>
            <hr style={styles.divider} />
          </div>
        ))}
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
  },
  header: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  testCard: {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease', // Smooth transition for hover
  },
  testHeader: {
    marginBottom: '10px',
  },
  testType: {
    fontSize: '22px',
    fontWeight: '500',
    color: '#333',
  },
  testDetails: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#555',
  },
  divider: {
    margin: '20px 0',
    borderColor: '#e5e7eb',
  },
};

// Add this CSS to your global styles or a CSS file
const css = `
  .hover-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Shadow on hover */
    transform: translateY(-5px); /* Slight upward lift */
  }
`;

// Inject styles dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default TestingSchedules;