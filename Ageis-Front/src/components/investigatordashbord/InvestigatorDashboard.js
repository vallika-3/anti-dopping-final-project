
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const InvestigatorDashboard = () => {
  const [athletesData, setAthletesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [investigatorName, setInvestigatorName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // For navigation

  const getData = async () => {
    try {
      const id = JSON.parse(sessionStorage.getItem("userData")).id;
      const response = await axios.post("http://localhost:8080/athletes/get-all-athletes-for-investigaor", { id });
      const data = response?.data;

      setAthletesData(data);
      setFilteredAthletes(data);
      setInvestigatorName(JSON.parse(sessionStorage.getItem("userData")));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = athletesData.filter((athlete) =>
      athlete.name.toLowerCase().includes(query) ||
      athlete.sport.toLowerCase().includes(query)
    );
    setFilteredAthletes(filtered);
  };

  const handleLogout = () => {
    // Clear session and redirect to signup
    sessionStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3b5c] to-[#2c577a]">
      {/* Navigation Bar */}
      <nav className="bg-[#203C5C] sticky top-0 z-10 py-4">
        <div className="flex justify-between items-center px-6 text-white">
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/29/Ministry_of_Youth_Affairs_and_Sports.svg"
              alt="Ministry Logo"
              className="h-12 w-auto filter invert mr-4"
            />
            <span className="text-2xl font-bold">Ageis Track</span>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search athletes..."
              className="px-4 py-2 rounded-lg text-black focus:outline-none"
            />
              <div className="relative">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden shadow-xl">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-medium text-lg">{investigatorName?.name}</span>
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg text-black w-48">
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                    onClick={handleLogout}
                  >
                    <span>🔓</span> {/* Logout Emoji */}
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-16 bg-[#f9f8f1]">
        <div className="container mx-auto px-6">
          <h5 className="text-4xl font-extrabold text-[#1f3b5c] uppercase mb-10 tracking-wide text-center">
            Athlete Dashboard
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {filteredAthletes.map((athlete) => (
              <div
                key={athlete.id}
                className="bg-[#f0f5f9] rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300 transform hover:scale-105 overflow-hidden border border-gray-200 cursor-pointer"
                onClick={() => (window.location.href = `/athlete-details/${athlete._id}`)}
              >
                {/* Card Header */}
                <div className="relative">
                  <img
                    src={athlete.image}
                    alt={athlete.name}
                    className="w-full h-52 object-cover rounded-t-lg"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col justify-start h-auto">
                  <div className="mb-2">
                    <h2
                      className={`font-semibold text-lg ${
                        athlete.isReported ? "text-red-500" : "text-[#1f3b5c]"
                      }`}
                    >
                      {athlete.name}
                    </h2>
                    <p className="text-gray-600 text-sm">{athlete.sport}</p>
                  </div>

                  {athlete.description && (
                    <p className="text-gray-600 text-base mb-4 line-clamp-3">
                      {athlete.description}
                    </p>
                  )}

                  <div className="mt-auto">
                    <Link
                      to={`/athlete-details/${athlete._id}`}
                      className="inline-block px-6 py-3 bg-[#1f3b5c] text-white text-base font-semibold rounded-lg shadow-md hover:bg-[#2c577a] hover:shadow-xl transition-all duration-300"
                      style={{ textDecoration: "none" }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigatorDashboard;