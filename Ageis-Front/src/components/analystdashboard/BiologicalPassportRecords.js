import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AthleteBiologicalPassport = ({athleteId}) => {
  
  const [AthleteDetails, setAthleteDetails] = useState({});
  const [athleteProfile, setAthleteProfile] = useState({});
  const [bloodProfileResults, setBloodProfileResults] = useState({});
  const [urineProfileResults, setUrineProfileResults] = useState({});
  const [hormonalMarkersResults, setHormonalMarkersResults] = useState({});
  const [thresholdLimits, setThresholdLimits] = useState({});
  
  // Predetermined results
  // const bloodProfileResults = {
  //   hematocrit: 44,
  //   hemoglobin: 14,
  //   reticulocyte: 1.3,
  //   ferritin: 120,
  // };

  // const urineProfileResults = {
  //   teRatio: 0.8,
  //   syntheticHormones: 0.4,
  // };

  // const hormonalMarkersResults = {
  //   testosterone: 8,
  //   growthHormone: 4,
  //   cortisol: 18,
  //   thyroidHormones: 4.2,
  // };

  // const thresholdLimits = {
  //   hematocrit: 45,
  //   hemoglobin: 15,
  //   reticulocyte: 1.5,
  //   ferritin: 100,
  //   teRatio: 1,
  //   syntheticHormones: 0.5,
  //   testosterone: 10,
  //   growthHormone: 5,
  //   cortisol: 20,
  //   thyroidHormones: 4.5,
  // };

  // Athlete profile data
  // const athleteProfile = {
  //   name: 'John Doe',
  //   age: 25,
  //   gender: 'Male',
  //   sport: 'Track and Field',
  //   team: 'National Team',
  //   position: 'Sprinter',
  //   profileImage: 'https://via.placeholder.com/150', // Add a placeholder image URL or the athlete's image URL
  //   contactInfo: {
  //     phone: '+1 (555) 123-4567',
  //     email: 'johndoe@example.com',
  //     address: '1234 Athlete Lane, Sports City, Country',
  //   },
  //   performanceStats: {
  //     best100mTime: '10.4s',
  //     best200mTime: '21.3s',
  //     olympics: '2024',
  //     worldRecord: '9.58s',
  //   },
  //   careerAchievements: [
  //     'Gold Medal, 2020 Olympics',
  //     'World Champion 100m, 2022',
  //     'National Record Holder 200m, 2021',
  //   ],
  // };

  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/athletes/get-athlete-details-by-id", { athleteId: athleteId });
      const data = response?.data?.BiologicalPassportRecords;

      setAthleteDetails(data);
      setBloodProfileResults(data?.bloodProfileResults);
      setUrineProfileResults(data?.urineProfileResults);
      setHormonalMarkersResults(data?.hormonalMarkersResults);
      setThresholdLimits(data?.thresholdLimits);

      setAthleteProfile({
        name: data?.name,
        age: data?.age,
        gender: data?.gender,
        sport: data?.sport,
        team: data?.team,
        position: data?.position,
        profileImage: data?.profileImage,
        contactInfo: data?.contactInfo,
        performanceStats: data?.performanceStats,
        careerAchievements: data?.careerAchievements,
      });

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // Function to determine the status based on the result and threshold
  const getStatus = (result, threshold) => {
    if (result === 0) return 'Not Tested';
    return result > threshold ? 'Above Threshold' : 'Within Threshold';
  };

  // Function to create chart data
  const createChartData = (resultData, thresholdData) => {
    return {
      labels: Object.keys(resultData||{}),
      datasets: [
        {
          label: 'Test Result',
          data: Object.values(resultData||{}),
          backgroundColor: '#FCDC94', // Custom color for the result bars
          borderColor: '#FCDC94', // Custom border color for the result bars
          borderWidth: 1,
        },
        {
          label: 'Threshold Limit',
          data: Object.values(thresholdData||{}),
          backgroundColor: '#C8CFA0', // Custom color for the threshold bars
          borderColor: '#C8CFA0', // Custom border color for the threshold bars
          borderWidth: 1,
        },
      ],
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Test Results vs Threshold Limits',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
      gap: '20px',
      padding: '20px',
    },
    card: {
      padding: '20px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      transition: 'transform 0.3s ease-in-out',
    },
    cardHover: {
      transform: 'scale(1.02)',
    },
   
    heading: {
      textAlign: 'center',
      color: '#333',
      fontSize: '24px',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    section: {
      marginBottom: '20px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    sectionTitle: {
      fontSize: '20px',
      marginBottom: '10px',
      fontWeight: 'bold',
      color: '#555',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
    },
    th: {
      padding: '8px',
      textAlign: 'left',
      backgroundColor: '#f2f2f2',
      borderBottom: '1px solid #ddd',
    },
    td: {
      padding: '8px',
      borderBottom: '1px solid #ddd',
      textAlign: 'center',
    },
    athleteProfileCard: {
      padding: '20px',
      border: '2px solid #ddd',
      borderRadius: '12px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      marginBottom: '20px',
      transition: 'transform 0.3s ease-in-out',
    },
    athleteProfileCardHover: {
      transform: 'scale(1.02)',
    },
    profileImage: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '4px solid #4e73df',
      marginBottom: '20px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'center',
    },
    profileLabel: {
      fontWeight: 'bold',
      color: '#555',
    },
    profileValue: {
      color: '#333',
      fontSize: '16px',
      textAlign: 'center',
    },
    contactInfo: {
      backgroundColor: '#f3f4f6',
      padding: '15px',
      borderRadius: '8px',
      marginTop: '10px',
      width: '100%',
    },
    achievements: {
      listStyleType: 'disc',
      paddingLeft: '20px',
      marginTop: '15px',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      {/* Athlete Profile Card */}
      <div style={{ ...styles.athleteProfileCard, ...styles.athleteProfileCardHover }}>
        <h1 style={styles.heading}>Athlete Profile</h1>
        <div style={styles.profileInfo}>
          <img src={athleteProfile?.profileImage} alt="Profile" style={styles.profileImage} />
          <div>
            <span style={styles.profileLabel}>Name:</span>
            <span style={styles.profileValue}>{athleteProfile.name}</span>
          </div>
          <div>
            <span style={styles.profileLabel}>Age:</span>
            <span style={styles.profileValue}>{athleteProfile.age}</span>
          </div>
          <div>
            <span style={styles.profileLabel}>Gender:</span>
            <span style={styles.profileValue}>{athleteProfile.gender}</span>
          </div>
          <div>
            <span style={styles.profileLabel}>Sport:</span>
            <span style={styles.profileValue}>{athleteProfile.sport}</span>
          </div>
          <div>
            <span style={styles.profileLabel}>Team:</span>
            <span style={styles.profileValue}>{athleteProfile.team}</span>
          </div>
          <div>
            <span style={styles.profileLabel}>Position:</span>
            <span style={styles.profileValue}>{athleteProfile.position}</span>
          </div>
        </div>

        {/* Contact Information */}
        <div style={styles.contactInfo}>
          <h2 style={styles.sectionTitle}>Contact Information</h2>
          <div><span style={styles.profileLabel}>Phone:</span><span style={styles.profileValue}>{athleteProfile?.contactInfo?.phone}</span></div>
          <div><span style={styles.profileLabel}>Email:</span><span style={styles.profileValue}>{athleteProfile?.contactInfo?.email}</span></div>
          <div><span style={styles.profileLabel}>Address:</span><span style={styles.profileValue}>{athleteProfile?.contactInfo?.address}</span></div>
        </div>

        {/* Career Achievements */}
        <div style={styles.contactInfo}>
          <h2 style={styles.sectionTitle}>Career Achievements</h2>
          <ul style={styles.achievements}>
            {athleteProfile?.careerAchievements?.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Blood Profile */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Blood Profile</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Test</th>
              <th style={styles.th}>Result</th>
              <th style={styles.th}>Threshold</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {['hematocrit', 'hemoglobin', 'reticulocyte', 'ferritin'].map((key) => (
              <tr key={key}>
                <td style={styles.td}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td style={styles.td}>{bloodProfileResults?.[key]}</td>
                <td style={styles.td}>{thresholdLimits?.[key]}</td>
                <td style={styles.td}>{getStatus(bloodProfileResults?.[key], thresholdLimits?.[key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Bar data={createChartData(bloodProfileResults, thresholdLimits)} options={chartOptions} />
      </div>

      {/* Urine Profile */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Urine Profile</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Test</th>
              <th style={styles.th}>Result</th>
              <th style={styles.th}>Threshold</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {['teRatio', 'syntheticHormones'].map((key) => (
              <tr key={key}>
                <td style={styles.td}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td style={styles.td}>{urineProfileResults?.[key]}</td>
                <td style={styles.td}>{thresholdLimits?.[key]}</td>
                <td style={styles.td}>{getStatus(urineProfileResults?.[key], thresholdLimits?.[key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Bar data={createChartData(urineProfileResults, thresholdLimits)} options={chartOptions} />
      </div>

      {/* Hormonal Markers */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Hormonal Markers</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Test</th>
              <th style={styles.th}>Result</th>
              <th style={styles.th}>Threshold</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {['testosterone', 'growthHormone', 'cortisol', 'thyroidHormones'].map((key) => (
              <tr key={key}>
                <td style={styles.td}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td style={styles.td}>{hormonalMarkersResults?.[key]}</td>
                <td style={styles.td}>{thresholdLimits?.[key]}</td>
                <td style={styles.td}>{getStatus(hormonalMarkersResults?.[key], thresholdLimits?.[key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Bar data={createChartData(hormonalMarkersResults, thresholdLimits)} options={chartOptions} />
      </div>
    </div>
  );
};

export default AthleteBiologicalPassport;
