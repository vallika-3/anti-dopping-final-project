import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import ReportForm from "./components/ReportForm";
import InvestigatorDashboard from "./components/investigatordashbord/InvestigatorDashboard";
import AthleteDetails from "./components/investigatordashbord/AthleteDetails";
import AthleteDashboard from "./components/atheletedashbord/AthleteDashboard";
import BiologicalPassportRecords from "./components/investigatordashbord/BiologicalPassportRecords";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Performance from "./components/investigatordashbord/Performance";
import ThankYouPage from "./components/ThankYouPage"; // Import the Thank You page
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AnalystDashboard from "./components/analystdashboard/AnalystDashboard";
import AdminDashboard from "./components/admindashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";





function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        
        <Route path="/dashboard" element={<div>Welcome to the dashboard!</div>} />
        <Route path="/analyst-dashboard" element={<ProtectedRoute
            element={<AnalystDashboard />}
            requiredRole="Analyst"
          />
} />
        <Route path="/investigator-dashboard" element={<ProtectedRoute
            element={<InvestigatorDashboard />}
            requiredRole="Investigator"
          />
} />
        {/* <Route path="/athlete-dashboard" element={<ProtectedRoute
            element={<AthleteDashboard />}
            requiredRole="athlete"
          />
} /> */}
        <Route path="/admin-dashboard" element={<ProtectedRoute
            element={<AdminDashboard />}
            requiredRole="Admin"
          />
} />


        {/* Athlete Details with Nested Routes */}
        <Route path="/athlete-details/:athleteId" element={<AthleteDetails />}>
        </Route>

        {/* Miscellaneous */}
        <Route path="/report" element={<ReportForm />} />
        <Route path="/thank-you" element={<ThankYouPage />} /> {/* Thank You page route */}
      </Routes>
    </Router>
  );
}

export default App;