// src/Login.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    await LoginUser({ email: email, password: password });

    // Reset fields
    setEmail("");
    setPassword("");
    setError("");
  };

  const LoginUser = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/users/signin", values);
      
      const userRole = response.data.role;
      sessionStorage.setItem('userData', JSON.stringify(response.data));
      if (userRole === "Whistleblower") {
        navigate("/report");
      } else if (userRole === "Investigator") {
        navigate("/investigator-dashboard");
      } else if (userRole === "Admin"){
        navigate("/admin-dashboard");
      }
      else{
        navigate("/analyst-dashboard");
      }
      return response.data;
    } catch (error) {
      console.log("err : ", error?.response?.data);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#203c5c", // Solid background color
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "30px 40px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#203c5c",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            marginBottom: "20px",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Welcome Back!
        </h2>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "1rem",
                border: "2px solid #203c5c",
                borderRadius: "8px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "1rem",
                border: "2px solid #203c5c",
                borderRadius: "8px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "1.1rem",
              backgroundColor: "#203c5c",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c577a")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#203c5c")}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: "15px", fontSize: "0.9rem" }}>
          <p style={{ color: "#203c5c" }}>
            Don't have an account? <a href="/signup" style={{ color: "#203c5c", fontWeight: "bold" }}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;