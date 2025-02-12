import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Initial Data
const initialCases = [
  {
    complaintId: "C001",
    description: "Financial Misconduct",
    status: "Pending",
    priority: "High",
    assignedTo: "",
    investigatorAssigned: "",
    feedback: [],
  },
  {
    complaintId: "C002",
    description: "Doping Violation",
    status: "Assigned",
    priority: "Medium",
    assignedTo: "Analyst1",
    investigatorAssigned: "",
    feedback: [
      "Suspicious activity detected, needs further investigation.",
    ],
  },
];

const initialAthletes = [
  { athleteId: "A001", name: "John Doe", status: "Unverified" },
  { athleteId: "A002", name: "Jane Smith", status: "Verified" },
];

// Styles
const containerStyle = {
  display: "flex",
  height: "84vh",
  margin: "2vh auto",
  borderRadius: "24px",
  overflow: "hidden",
  width: "98.5%",
  fontFamily: "'Poppins', sans-serif",
  backgroundColor: "#eef3f8",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  position: "relative",
};

const leftPanelStyle = {
  width: "25%",
  backgroundColor: "#203c5c",
  padding: "30px 20px",
  borderRadius: "24px 0 0 24px",
  color: "#ffffff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "inset 0 3px 8px rgba(0, 0, 0, 0.25)",
};

const headerStyle = {
  fontSize: "28px",
  fontWeight: "800",
  marginBottom: "25px",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  textAlign: "center",
  borderBottom: "2px solid #162c42",
  paddingBottom: "10px",
  color: "#ffffff",
  textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
};

const menuListStyle = {
  listStyleType: "none",
  padding: "0",
  width: "100%",
  overflow: "auto",
};

const menuItemStyle = {
  padding: "4px 25px",
  marginBottom: "1.5rem",
  cursor: "pointer",
  borderRadius: "16px",
  transition: "all 0.3s ease",
  backgroundColor: "#203c5c",
  color: "#e6f1ff",
  fontWeight: "600",
  textAlign: "left",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
  lineHeight: "1.6",
  letterSpacing: "0.5px",
};

const hamburgerStyle = {
  position: "absolute",
  top: "33px",
  left: "20px",
  zIndex: "20",
  cursor: "pointer",
};

const rightPanelStyle = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "0 24px 24px 0",
  boxShadow: "inset 0 3px 8px rgba(0, 0, 0, 0.15)",
  overflowY: "auto",
  maxHeight: "92vh",
};

const App = () => {
  const [cases, setCases] = useState(initialCases);
  const [athletes, setAthletes] = useState(initialAthletes);
  const [notifications, setNotifications] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [newAthleteId, setNewAthleteId] = useState("");
  const [newAthleteName, setNewAthleteName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const assignCase = (caseId, analyst) => {
    setCases(
      cases.map((c) =>
        c.complaintId === caseId ? { ...c, assignedTo: analyst } : c
      )
    );
    setNotifications([...notifications, `Case ${caseId} assigned to ${analyst}`]);
    setOpenSnackbar(true);
  };

  const assignInvestigator = (caseId, investigator) => {
    setCases(
      cases.map((c) =>
        c.complaintId === caseId && c.assignedTo
          ? { ...c, investigatorAssigned: investigator }
          : c
      )
    );
    setNotifications([
      ...notifications,
      `Investigator assigned to Case ${caseId}: ${investigator}`,
    ]);
    setOpenSnackbar(true);
  };

  const addFeedback = (caseId, feedbackText) => {
    setCases(
      cases.map((c) =>
        c.complaintId === caseId
          ? { ...c, feedback: [...c.feedback, feedbackText] }
          : c
      )
    );
    setFeedback("");
    setNotifications([...notifications, `Feedback added to case ${caseId}`]);
    setOpenSnackbar(true);
  };

  const addUnverifiedAthlete = () => {
    const newAthlete = {
      athleteId: newAthleteId,
      name: newAthleteName,
      status: "Unverified",
    };
    setAthletes([...athletes, newAthlete]);
    setNotifications([ 
      ...notifications, 
      `New athlete added: ${newAthlete.name}` 
    ]);
    setNewAthleteId("");
    setNewAthleteName("");
    setOpenSnackbar(true);
  };

  const verifyAthlete = (athleteId) => {
    setAthletes(
      athletes.map((a) =>
        a.athleteId === athleteId ? { ...a, status: "Verified" } : a
      )
    );
    setNotifications([...notifications, `Athlete ${athleteId} verified`]);
    setOpenSnackbar(true);
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={leftPanelStyle}>
        <div style={headerStyle}>Dashboard</div>
        <ul style={menuListStyle}>
          <li style={menuItemStyle} onClick={() => setSelectedCase(null)}>
            Case Management
          </li>
          <li style={menuItemStyle} onClick={() => setSelectedAthlete(null)}>
            Athlete Management
          </li>
          <li style={menuItemStyle} onClick={() => alert("Settings coming soon")}>
            System Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={rightPanelStyle}>
        {/* Snackbar Notifications */}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
            {notifications[notifications.length - 1]}
          </Alert>
        </Snackbar>

        <Grid container spacing={4}>
          {/* Case Management */}
          {selectedCase === null && (
            <Card elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5" gutterBottom>All Cases</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Complaint ID</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cases.map((complaint) => (
                      <TableRow key={complaint.complaintId}>
                        <TableCell>{complaint.complaintId}</TableCell>
                        <TableCell>{complaint.status}</TableCell>
                        <TableCell>{complaint.priority}</TableCell>
                        <TableCell>
                          {complaint.assignedTo === "" ? (
                            <Button
                              onClick={() => assignCase(complaint.complaintId, "Analyst1")}
                              variant="contained"
                              color="primary"
                            >
                              Assign Analyst
                            </Button>
                          ) : complaint.investigatorAssigned === "" ? (
                            <Button
                              onClick={() => assignInvestigator(complaint.complaintId, "Investigator1")}
                              variant="contained"
                              color="secondary"
                            >
                              Assign Investigator
                            </Button>
                          ) : (
                            <Typography variant="body2" color="textSecondary">Assigned</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}

          {/* Athlete Management */}
          {selectedAthlete === null && (
            <Card elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5" gutterBottom>Athlete Management</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Athlete ID"
                    value={newAthleteId}
                    onChange={(e) => setNewAthleteId(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Athlete Name"
                    value={newAthleteName}
                    onChange={(e) => setNewAthleteName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={addUnverifiedAthlete} variant="contained" color="primary">Add Athlete</Button>
                </Grid>
              </Grid>
              <TableContainer style={{ marginTop: "20px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Athlete ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {athletes.map((athlete) => (
                      <TableRow key={athlete.athleteId}>
                        <TableCell>{athlete.athleteId}</TableCell>
                        <TableCell>{athlete.name}</TableCell>
                        <TableCell>{athlete.status}</TableCell>
                        <TableCell>
                          {athlete.status === "Unverified" && (
                            <Button
                              onClick={() => verifyAthlete(athlete.athleteId)}
                              variant="contained"
                              color="primary"
                            >
                              Verify
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default App;