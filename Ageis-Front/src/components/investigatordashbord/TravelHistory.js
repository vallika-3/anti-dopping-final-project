import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const TravelHistory = ({ athleteId }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [travelData, setTravelData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/athletes/get-athlete-details-by-id", { athleteId: athleteId });
      setTravelData(response?.data?.TravelHistory);
      console.log(response?.data?.TravelHistory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h4
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2.5rem",
            fontWeight: "600",
            color: "#333",
            textTransform: "uppercase",
          }}
        >
          Travel History
        </h4>
      </header>

      <main style={styles.main}>
        {/* Travel History Table */}
        <section style={styles.tableSection}>
          <h2 style={styles.sectionTitle}>Travel History</h2>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Destination</th>
                <th style={styles.th}>Purpose</th>
                <th style={styles.th}>Duration</th>
                <th style={styles.th}>Risk Score</th>
                <th style={styles.th}>Weather</th>
                <th style={styles.th}>Flagged</th>
              </tr>
            </thead>
            <tbody>
              {travelData?.map((event, index) => (
                <tr
                  key={index}
                  style={event.Flagged ? styles.suspiciousRow : styles.normalRow}
                  onClick={() => setSelectedRow(event)}
                >
                  <td style={styles.td}>{event.Date}</td>
                  <td style={styles.td}>{event.Destination}</td>
                  <td style={styles.td}>{event.Purpose}</td>
                  <td style={styles.td}>{event.Duration}</td>
                  <td style={styles.td}>{event.RiskScore}</td>
                  <td style={styles.td}>{event.Weather}</td>
                  <td style={styles.td}>{event.Flagged ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Travel Map with Heatmap */}
        <section style={styles.mapSection}>
          <h2 style={styles.sectionTitle}>Travel Map</h2>
          <MapContainer
            center={[20.5937, 78.9629]} // Centered over the world
            zoom={2}
            style={styles.map}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {travelData?.map((event, index) => (
              <Marker key={index} position={event?.Coordinates}>
                <Popup>
                  <strong>{event.Destination}</strong>
                  <br />
                  Purpose: {event.Purpose}
                  <br />
                  Duration: {event.Duration}
                  <br />
                  Risk Score: {event.RiskScore}
                  <br />
                  Weather: {event.Weather}
                </Popup>
              </Marker>
            ))}
            {travelData?.map((event, index) => (
              <Circle
                key={index}
                center={event?.Coordinates}
                radius={event?.RiskScore * 10000}
                pathOptions={{ color: event.flagged ? "red" : "blue" }}
              />
            ))}
          </MapContainer>
        </section>

        {/* Detailed Event Information */}
        {selectedRow && (
          <section style={styles.detailSection}>
            <h2 style={styles.sectionTitle}>Event Details</h2>
            <p><strong>Date:</strong> {selectedRow.Date}</p>
            <p><strong>Destination:</strong> {selectedRow.Destination}</p>
            <p><strong>Purpose:</strong> {selectedRow.Purpose}</p>
            <p><strong>Duration:</strong> {selectedRow.Duration}</p>
            <p><strong>Visa Details:</strong> {selectedRow.VisaDetails}</p>
            <p><strong>Ticket Cost:</strong> {selectedRow.TicketCost}</p>
            <p><strong>Accompanying Persons:</strong> {selectedRow.AccompanyingPersons}</p>
            <p><strong>Weather:</strong> {selectedRow.Weather}</p>
            <p><strong>Risk Score:</strong> {selectedRow.RiskScore}</p>
          </section>
        )}
      </main>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  main: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  tableSection: {
    flex: 1,
    minWidth: "600px",
  },
  mapSection: {
    flex: 1,
    height: "500px",
    minWidth: "600px",
  },
  detailSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  headerRow: {
    backgroundColor: "#203c5c",
    color: "#fff",
  },
  th: {
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  normalRow: {
    cursor: "pointer",
  },
  suspiciousRow: {
    cursor: "pointer",
    backgroundColor: "#ffe6e6",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  sectionTitle: {
    marginBottom: "10px",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};

export default TravelHistory;