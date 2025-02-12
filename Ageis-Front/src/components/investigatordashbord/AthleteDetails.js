import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import RightPanel from "./RightPanel";

const AthleteDetails = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Medical Test Reports"); // Default section
  const params = useParams();
  const navigate = useNavigate();

  const investigatorName = { name: "John Doe" }; // Placeholder for investigator's name

  const handleMenuItemClick = (item) => {
    setSelectedSection(item);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-[#203C5C] sticky top-0 z-10 py-4 shadow-lg">
        <div className="flex justify-between items-center px-6 text-white">
          {/* Back Button */}
          <div className="flex items-center">
            <button
              onClick={handleGoBack}
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
            <span className="text-2xl font-bold">Athlete Details</span>
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
            <span className="text-white font-medium text-lg">
              {investigatorName.name}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={containerStyle}>
        {/* Sidebar */}
        {isMenuOpen && (
          <div style={leftPanelStyle}>
            <h3 style={{...headerStyle, fontSize:"20px"}}>Athlete Details</h3>
            <ul style={menuListStyle}>
              {menuItems.slice(0, -1).map((item) => (  // Excluding Analyze from the loop
                <li
                  key={item}
                  style={{
                    ...menuItemStyle,
                    backgroundColor:
                      selectedSection === item ? "#346195" : "#203c5c", // Updated color for selected
                    color: selectedSection === item ? "#ffffff" : "#e6f1ff",
                    fontWeight: selectedSection === item ? "800" : "600",
                  }}
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item}
                </li>
              ))}
              <li
                style={{
                  ...menuItemStyle,
                  backgroundColor: "#ffffff", // White background for the Analyze button
                  color: "#203c5c", // Blue text for the Analyze button
                  fontWeight: "800", // Bold font for Analyze button
                  marginTop: "auto", // Push it to the bottom
                  display: 'flex', // Make the li a flex container
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                }}
                onClick={() => handleMenuItemClick("Analyze")}
              >
                Analyze
              </li>
            </ul>
          </div>
        )}

        {/* Content Area */}
        <div style={rightPanelStyle}>
          <RightPanel
            selectedSection={selectedSection}
            athleteId={params.athleteId}
          />
        </div>

        {/* Hamburger Icon */}
        <div
          style={{
            ...hamburgerStyle,
            color: isMenuOpen ? "#ffffff" : "#203c5c",
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars size={24} />
        </div>
        
      </div>
    </div>
  );
};

// Menu items
const menuItems = [
  "Medical Test Reports",
  "Biological Passport Records",
  "Performance",
  "Whistle Blower Reports",
  "Analyze", // Analyze button is now at the bottom
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

export default AthleteDetails;