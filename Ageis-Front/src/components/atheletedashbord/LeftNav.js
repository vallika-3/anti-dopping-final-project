import React from "react";

const LeftNav = ({ menuItems, activeSection, setActiveSection }) => {
  const menuItemStyle = {
    padding: "15px 20px",
    marginBottom: "20px",
    cursor: "pointer",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    backgroundColor: "#203c5c", // Default dark blue
    color: "#e0e7ff", // Softer light blue text
    textAlign: "left",
    fontWeight: "500",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
  };

  const headerStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "40px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    textAlign: "center",
    borderBottom: "3px solid #203c5c", // Dark blue border
    paddingBottom: "10px",
  };

  return (
    <div
      style={{
        width: "25%",
        backgroundColor: "#203c5c", // Sidebar background
        padding: "30px 20px",
        borderRight: "2px solid #e5e7eb",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        overflow: "hidden",
        color: "#fff",
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      <h3 style={headerStyle}>Athlete Dashboard</h3>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {menuItems.map((item) => (
          <li
            key={item}
            style={{
              ...menuItemStyle,
              backgroundColor: activeSection === item ? "#e0e7ff" : "#203c5c", // Highlight selected item
              color: activeSection === item ? "#203c5c" : "#e0e7ff", // Text color for active/inactive
            }}
            onClick={() => setActiveSection(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftNav;