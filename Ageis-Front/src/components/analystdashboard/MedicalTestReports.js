import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { LineChart, Line } from 'recharts';

// Sample data for visualizations (you can modify this based on real data)
// const medicalTests = [
//   {
//     title: "Vital Signs",
//     result: "120/80 mm Hg",
//     threshold: "120/80 mm Hg",
//     status: "Normal",
//   },
//   {
//     title: "Blood Test (Hemoglobin)",
//     result: "14 g/dL",
//     threshold: "Men: 13.8–17.2 g/dL, Women: 12.1–15.1 g/dL",
//     status: "Normal",
//   },
//   {
//     title: "Urine Test (Protein)",
//     result: "Negative",
//     threshold: "<20 mg/dL",
//     status: "Normal",
//   },
//   {
//     title: "Cardiovascular Health (ECG)",
//     result: "Normal",
//     threshold: "Sinus rhythm",
//     status: "Normal",
//   },
//   {
//     title: "Respiratory Function (FEV1)",
//     result: "85% of predicted",
//     threshold: ">80% of predicted value",
//     status: "Normal",
//   },
//   {
//     title: "Musculoskeletal Assessments",
//     result: "Normal strength",
//     threshold: "Balanced and proportionate",
//     status: "Normal",
//   },
//   {
//     title: "Nutritional Deficiencies (Iron)",
//     result: "100 µg/dL",
//     threshold: "Men: 80–180 µg/dL, Women: 60–160 µg/dL",
//     status: "Normal",
//   },
//   {
//     title: "Hormonal Profiling (Testosterone)",
//     result: "500 ng/dL",
//     threshold: "Men: 300–1,000 ng/dL, Women: 15–70 ng/dL",
//     status: "Normal",
//   },
//   {
//     title: "Body Composition (BMI)",
//     result: "22.5",
//     threshold: "18.5–24.9 (Normal)",
//     status: "Normal",
//   },
//   {
//     title: "Hydration Status (Sodium)",
//     result: "140 mmol/L",
//     threshold: "135–145 mmol/L",
//     status: "Normal",
//   },
//   {
//     title: "Blood Glucose (Fasting)",
//     result: "90 mg/dL",
//     threshold: "70–100 mg/dL",
//     status: "Normal",
//   },
//   {
//     title: "Lipid Profile (Total Cholesterol)",
//     result: "180 mg/dL",
//     threshold: "<200 mg/dL",
//     status: "Normal",
//   },
// ];

const App = ({athleteId}) => {
  // Preparing data for charts

  const [medicalTests, setMedicalTests] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/athletes/get-athlete-details-by-id", { athleteId: athleteId });
      setMedicalTests(response?.data?.MedicalTestReports);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // console.log(medicalTests)

  const statusCount = medicalTests?.reduce(
    (acc, test) => {
      acc[test.status === "Normal" ? "normal" : "abnormal"]++;
      return acc;
    },
    { normal: 0, abnormal: 0 }
  );

  const testResults = medicalTests?.map(test => ({
    name: test.title,
    result: parseFloat(test.result) || 0,
  }));

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Athlete Medical Test Report</h1>

      <div style={styles.visualizationsContainer}>
        {/* Visualization: Bar Chart */}
        <div style={styles.chartContainer}>
          <h2>Test Result Bar Chart</h2>
          <p>This chart represents the results of various medical tests, showing their numerical values. Each bar corresponds to a different test.</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={testResults}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="result" fill="#C8CFA0" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartContainer}>
          <h2>Status Distribution Pie Chart</h2>
          <p>
            This pie chart represents the distribution of test results. It visualizes the proportion of tests that are
            classified as <strong>Normal</strong> vs <strong>Abnormal</strong>. The pie chart gives a quick overview of the
            test outcomes based on the status of each medical test.
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Normal', value: statusCount.normal },
                  { name: 'Abnormal', value: statusCount.abnormal },
                ]}
                outerRadius={120}
                fill="#203c5c"
                dataKey="value"
              >
                <Cell fill="#FCDC94" />
                <Cell fill="#C8CFA0" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Visualization: Line Chart for Test Results Over Time */}
        <div style={styles.chartContainer}>
          <h2>Test Results Over Time (Sample Line Chart)</h2>
          <p>This line chart visualizes the results of tests over time or across various tests. It helps to track the progression of test results.</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={testResults}>
              <Line type="monotone" dataKey="result" stroke="#C8CFA0" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Medical Test Cards */}
      <div style={styles.cardContainer}>
        {medicalTests?.map((test, index) => (
          <div key={index} style={styles.card}>
            <h2 style={styles.cardTitle}>{test.title}</h2>
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td style={styles.tableCell}><strong>Result:</strong></td>
                  <td style={styles.tableCell}>{test.result}</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}><strong>Threshold Limit:</strong></td>
                  <td style={styles.tableCell}>{test.threshold}</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}><strong>Status:</strong></td>
                  <td style={{ ...styles.tableCell, color: test.status === "Normal" ? "#27ae60" : "#e74c3c" }}>
                    {test.status}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f4f4f4",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",  // Center content
  },
  header: {
    textAlign: "center",
    color: "#203c5c",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
  },
  visualizationsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "20px",
    width: "100%",
    maxWidth: "1200px", // Maximum width of container
    marginBottom: "30px",
  },
  chartContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Responsive grid for cards
    gap: "15px", // Spacing between cards
    width: "100%",
    maxWidth: "1200px", // Max width for larger screens
    padding: "10px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "100%",
  },
  cardTitle: {
    color:" black",
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableCell: {
    padding: "8px 12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
};

export default App;
