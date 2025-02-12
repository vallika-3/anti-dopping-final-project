import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Signup = ({ onLogin }) => {
  const [userRole, setUserRole] = useState("Athlete");
  const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#203C5C] text-[#f9f8f1]">
      {/* Whistleblower Button */}
      <button
        onClick={() => navigate("/report")}
        className="absolute top-4 right-4 px-4 py-2 bg-[#f9f8f1] text-[#203C5C] font-medium rounded-lg shadow-md hover:bg-[#e8e6da] transition-colors"
      >
        Whistleblower
      </button>

      {/* Left Section: Carousel */}
      <div className="w-1/2 flex items-center justify-center">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showIndicators={false}
          className="w-[98%] max-w-[1000px]  h-[60%] rounded-lg overflow-hidden shadow-lg"
        >
          <div>
            <img
              src="https://media.licdn.com/dms/image/v2/D4D12AQGlmJZcIgDioQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696565660381?e=2147483647&v=beta&t=hMiFbjUyWFQ1eSoTl6MeK0lOpdF30m3xtwaisgEGPzw"
              alt="Carousel Image 1"
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div>
            <img
              src="https://www.newsx.com/wp-content/uploads/2024/07/Lavanya-Website-Image-16.jpg"
              alt="Carousel Image 2"
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div>
            <img
              src="https://live-production.wcms.abc-cdn.net.au/d1312f8b810efb22a429f3b192facede?impolicy=wcms_crop_resize&cropH=2813&cropW=5000&xPos=0&yPos=260&width=862&height=485"
              alt="Carousel Image 3"
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div>
            <img
              src="https://assets.telegraphindia.com/telegraph/2024/Jul/1719812905_t20-wc.jpg"
              alt="Carousel Image 4"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </Carousel>
      </div>

      {/* Right Section: Signup Form */}
      <div className="w-1/2 flex flex-col justify-center px-10">
        <h1 className="text-3xl font-bold mb-6">Sign in for {userRole}</h1>
        <div className="flex justify-between mb-6">
          {["Analyst", "Investigator", "Admin"].map((role) => (
            <button
              key={role}
              onClick={() => {
                setUserRole(role);
                setData((prev) => ({ ...prev, role: role }));
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                userRole === role
                  ? "bg-[#f9f8f1] text-[#203C5C]"
                  : "bg-[#203C5C] text-[#f9f8f1] border-[#f9f8f1]"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/login"
            className="block bg-[#f9f8f1] text-[#203C5C] py-3 text-center rounded-lg font-bold shadow-md hover:bg-[#e8e6da] hover:shadow-lg transition-all no-underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
