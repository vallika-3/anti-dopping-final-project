import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

const PerformancePage = ({athleteId}) => {
  // const [athlete?, setAthlete] = useState({
  //   name: "John Doe",
  //   sportHistory?: [
  //     { game: "Game 1", score: 85, date: "2023-01-01", result: "Win" },
  //     { game: "Game 2", score: 88, date: "2023-06-15", result: "Loss" },
  //     { game: "Game 3", score: 95, date: "2023-09-23", result: "Win" },
  //     { game: "Game 4", score: 92, date: "2024-01-10", result: "Win" }, // Example of recent game
  //   ],
  //   recentTrainingData: [
  //     { trainingDate: "2024-01-02", hoursTrained: 5 },
  //     { trainingDate: "2023-12-28", hoursTrained: 6 },
  //     { trainingDate: "2023-12-15", hoursTrained: 4 },
  //   ],
  // });
  const [athlete, setAthlete] = useState({});
  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/athletes/get-athlete-details-by-id", { athleteId: athleteId });
      const data = response?.data?.Performance;
      setAthlete(data);
      // console.log(athlete)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // Function to check for performance improvement (simple threshold)
  const isPerformanceSuspected = () => {
    const lastTwoScores = athlete?.sportHistory?.slice(-2);
    const scoreDifference = lastTwoScores?.[1].score - lastTwoScores?.[0].score;
    return scoreDifference >= 7; // Threshold for suspicion
  };

  const chartData = {
    labels: athlete?.sportHistory?.map((entry) => entry.date),
    datasets: [
      {
        label: "Performance (Score)",
        data: athlete?.sportHistory?.map((entry) => entry.score),
        fill: false,
        borderColor: isPerformanceSuspected() ? "red" : "green",
        tension: 0.1,
      },
    ],
  };

  // Calculate average score and best score
  const averageScore = (
    athlete?.sportHistory?.reduce((acc, curr) => acc + curr.score, 0) /
    athlete?.sportHistory?.length
  ).toFixed(2);

  const bestScore = Math.max(...athlete?.sportHistory?.map((entry) => entry.score) || []);

  // Calculate average training hours
  const averageTrainingHours = (
    athlete?.recentTrainingData?.reduce((acc, curr) => acc + curr.hoursTrained, 0) /
    athlete?.recentTrainingData?.length
  ).toFixed(1);

  // Separate wins and losses
  const wins = athlete?.sportHistory?.filter((entry) => entry.result === "Win");
  const losses = athlete?.sportHistory?.filter((entry) => entry.result === "Loss");

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Athlete Performance</h1>

      <div style={styles.gridContainer}>
        {/* Performance Comparison (Past vs. Current) */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Performance Comparison</h2>
          <p style={styles.text}>Recent Performance: {athlete?.sportHistory?.slice(-1)[0].score}</p>
          <p style={styles.text}>Previous Best Score: {bestScore}</p>
          <p style={styles.text}>
            Performance Change:{" "}
            {isPerformanceSuspected() ? "Significant Increase - Possible Suspicion!" : "Normal Growth"}
          </p>
        </div>

        {/* Performance Analysis */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Performance Analysis</h2>
          <p style={styles.text}>Average Score: {averageScore}</p>
          <p style={styles.text}>Best Score: {bestScore}</p>
          <p style={styles.text}>Training Hours (Average): {averageTrainingHours} hours</p>
        </div>

        {/* Doping Risk Insights */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Doping Risk Insights</h2>
          <p style={styles.text}>
            Based on the athlete?'s performance trends and rapid improvement in recent games, there could be a
            higher risk of doping. Further analysis of the training hours and recovery periods is recommended.
          </p>
        </div>

        {/* Progressive Growth */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Progressive Growth</h2>
          <ul style={styles.list}>
            {athlete?.sportHistory?.map((entry, index) => (
              <li style={styles.text} key={index}>
                {entry.game} - Score: {entry.score} (Date: {entry.date})
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Training Data */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Recent Training Data</h2>
          <ul style={styles.list}>
            {athlete?.recentTrainingData?.map((entry, index) => (
              <li style={styles.text} key={index}>
                {entry.trainingDate} - Hours Trained: {entry.hoursTrained} hours
              </li>
            ))}
          </ul>
        </div>

        {/* Wins and Losses */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Wins and Losses</h2>
          <div>
            <h3 style={styles.cardTitle}>Wins</h3>
            <ul style={styles.list}>
              {wins?.map((entry, index) => (
                <li style={styles.text} key={index}>
                  {entry.game} - Score: {entry.score} (Date: {entry.date})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={styles.cardTitle}>Losses</h3>
            <ul style={styles.list}>
              {losses?.map((entry, index) => (
                <li style={styles.text} key={index}>
                  {entry.game} - Score: {entry.score} (Date: {entry.date})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Performance Chart (Visualization) */}
        <div style={styles.chartContainer}>
          <h3 style={styles.cardTitle}>Performance Over Time</h3>
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "40px",
    fontWeight: "600",
    fontSize: "36px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Added transition for smooth effect
  },
  cardTitle: {
    color: "#333",
    fontSize: "22px",
    marginBottom: "15px",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  text: {
    color: "#555",
    fontSize: "16px",
    margin: "10px 0",
    lineHeight: "1.6",
  },
  list: {
    paddingLeft: "20px",
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    gridColumn: "span 2", // Make it span the full width of the row
  },
};

// Hover effect styling
const hoverEffect = {
  ":hover": {
    transform: "scale(1.05)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", // More pronounced shadow on hover
  },
};

export default PerformancePage;
