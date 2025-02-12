import React, { useEffect, useState } from 'react';
import axios from "axios";

const WhistleBlowerReports = ({athleteId}) => {
  // Sample data for whistleblower reports
  const [reports, setReports] = useState([]);
  // {
  //   id: 1,
  //   report: 'Suspicious performance enhancement substances observed in athlete training sessions.',
  //   evidenceImage: 'https://www.pewtrusts.org/-/media/post-launch-images/2020/03/gettyimages1138135018jpgmaster/16x9_m.jpg', // New image URL
  //   reportedDate: '2024-12-01',
  //   reportedBy: {
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //   },
  // },
  // console.log(athleteId)
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/whistleblower/get-all-reports");
      const data  = response?.data;
      const matchingReports = data.filter(report => report.athleteName === athleteId);
     
      if(matchingReports.length > 0){
        setReports(matchingReports);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // [{
  //   report: data.description,
  //   reportedBy: {name : data.whistleblowerName,email: data.whistleblowerEmail},
  //   reportedDate: data.reportedDate,
  //   evidenceImage: data.attachments,
  // }]
  useEffect(() => {
    getData();
  }, []);
  console.log(reports)
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Whistle Blower Reports</h1>

        {reports?.map((report) => (
          <div key={report.id} style={styles.reportCard} className="hover-card">
            <div style={styles.reportHeader}>
              <h2 style={styles.reportTitle}>Report {report.id}</h2>
            </div>
            <div style={styles.reportDetails}>
              <p><strong>Issue:</strong> {report.description}</p>
              <p><strong>Reported Date:</strong> {report.reportedDate}</p>
              <p><strong>Reported By:</strong> {report.whistleblowerName} ({report.whistleblowerEmail})</p>
              <div style={styles.imageContainer}>
                <img 
                  src={report.attachments} 
                  alt={`Evidence for report ${report.id}`} 
                  style={styles.image} 
                />
              </div>
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
  reportCard: {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  },
  reportHeader: {
    marginBottom: '10px',
  },
  reportTitle: {
    fontSize: '22px',
    fontWeight: '500',
    color: '#333',
  },
  reportDetails: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#555',
  },
  imageContainer: {
    marginTop: '10px',
  },
  image: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '8px',
  },
  divider: {
    margin: '20px 0',
    borderColor: '#e5e7eb',
  },
};

// Add this CSS to your global styles or a CSS file
const css = `
  .hover-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

// Inject styles dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default WhistleBlowerReports;