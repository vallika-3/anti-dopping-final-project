import React, { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import TestingSchedules from "./TestingSchedules";
import TestingResults from "./TestingResults";
import TUEManagement from "./TUEManagement";
import AdditionalRecords from "./AdditionalRecords";
import AthleteEducation from "./AthleteEducation";
import { FaArrowLeft } from 'react-icons/fa';

const AthleteDashboard = () => {
  const [activeSection, setActiveSection] = useState("Personal Information");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Personal Information",
    "Testing Schedules",
    "Testing Results",
    "TUE Management",
    "Additional Records",
    "Athlete Education",
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Personal Information":
        return <PersonalInformation />;
      case "Testing Schedules":
        return <TestingSchedules />;
      case "Testing Results":
        return <TestingResults />;
      case "TUE Management":
        return <TUEManagement />;
      case "Additional Records":
        return <AdditionalRecords />;
      case "Athlete Education":
        return <AthleteEducation />;
      default:
        return <PersonalInformation />;
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-[#203C5C] sticky top-0 z-10 py-4 shadow-lg">
        <div className="flex justify-between items-center px-6 text-white">
          {/* Back Button */}
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center text-white p-2 rounded-full focus:outline-none mr-4"
              aria-label="Go Back"
            >
              <FaArrowLeft size={18} />
            </button>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/29/Ministry_of_Youth_Affairs_and_Sports.svg"
              alt="Ministry Logo"
              className="h-12 w-auto filter invert mr-4"
            />
            <span className="text-2xl font-bold">Ageis Track</span>
          </div>

          {/* Profile Picture */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden shadow-xl">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-medium text-lg">Investigator Name</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={containerStyle}>
        {/* Left Panel (Sidebar) */}
        {isMenuOpen && (
          <div style={leftPanelStyle}>
            <div style={headerContainerStyle}>
              {/* Hamburger Icon */}
              <div
                style={hamburgerStyle}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                &#9776;
              </div>
              {/* Text - Athlete Dashboard */}
              <h3 style={headerStyle}>Athlete Dashboard</h3>
            </div>
            <ul style={menuListStyle}>
              {menuItems.map((item) => (
                <li
                  key={item}
                  style={{
                    ...menuItemStyle,
                    backgroundColor: activeSection === item ? "#346195" : "#203c5c",
                    color: activeSection === item ? "#ffffff" : "#e6f1ff",
                    fontWeight: activeSection === item ? "800" : "600",
                  }}
                  onClick={() => setActiveSection(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Right Panel (Content Area) */}
        <div style={rightPanelStyle}>
          {renderContent()}
        </div>

        {/* Hamburger Icon always visible */}
        {!isMenuOpen && (
          <div
            style={hamburgerStyleFixed}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            &#9776;
          </div>
        )}
      </div>
    </div>
  );
};

// Styles for the components
const containerStyle = {
  display: "flex",
  height: "92vh",
  margin: "3vh auto",
  borderRadius: "24px",
  overflow: "hidden",
  width: "98.5%",
  fontFamily: "'Poppins', sans-serif",
  backgroundColor: "#eef3f8",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  position: "relative",
  marginTop: "20px", // Adjust to account for the fixed navbar height
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

const headerContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "25px",
};

const headerStyle = {
  fontSize: "28px",
  fontWeight: "800",
  marginLeft: "10px",
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
};

const menuItemStyle = {
  padding: "20px 25px",
  marginBottom: "16px",
  cursor: "pointer",
  borderRadius: "16px",
  transition: "all 0.3s ease",
  backgroundColor: "#76ace8",
  color: "#76ace8",
  fontWeight: "600",
  textAlign: "left",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
  lineHeight: "1.6",
  letterSpacing: "0.5px",
};

const hamburgerStyle = {
  fontSize: "32px",
  cursor: "pointer",
  color: "#ffffff",
  paddingBottom: "15px",
  transition: "all 0.3s ease-in-out",
};

const hamburgerStyleFixed = {
  fontSize: "32px",
  cursor: "pointer",
  color: "#203c5c",
  position: "absolute",
  top: "30px",
  left: "30px",
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

export default AthleteDashboard;