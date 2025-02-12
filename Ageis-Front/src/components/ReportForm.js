import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportForm() {
  const [athletes, setAthletes] = useState(null);
  const [formData, setFormData] = useState({
    category: "Doping",
    athleteName: "",
    description: "",
    attachments: [],
    whistleblowerName: "",
    whistleblowerEmail: "",
  });
  
  const submitReport = async (formData) => {
    try {
      // console.log(formData)
      const data = {
        category: formData.category,
        athleteId: formData.athleteName,
        description: formData.description,
        whistleblowerName: formData.whistleblowerName,
        whistleblowerEmail: formData.whistleblowerEmail,      
      };
     
      formData.attachments.forEach((file) => {
        data.append({...data, attachments: file});
      });
      console.log(data)
      const response = await axios.post(
        "http://localhost:8080/whistleblower/create-report",
        {data: data}
      );
  
      console.log(response?.data);
    } catch (error) {
      console.error("Error submitting the report:", error);
    }
  };
    // const submitReport = async (formData) => {
    //   try {
    //     const data = new FormData(); // Create a new FormData object
    
    //     // Append the fields to the FormData object
    //     data.append('category', formData.category);
    //     data.append('athleteId', formData.athleteName);
    //     data.append('description', formData.description);
    //     data.append('whistleblowerName', formData.whistleblowerName);
    //     data.append('whistleblowerEmail', formData.whistleblowerEmail);
    
    //     // Append attachments to the FormData object
    //     formData.attachments.forEach((file) => {
    //       data.append('attachments', file); // Use 'attachments' as the key
    //     });
    
    //     console.log(data);
    
    //     const response = await axios.post(
    //       "http://localhost:8080/whistleblower/create-report",
    //       data, // Send the FormData object directly
    //       {
    //         headers: {
    //           'Content-Type': 'multipart/form-data' // Set the correct content type
    //         }
    //       }
    //     );
    
    //     console.log(response?.data);
    //   } catch (error) {
    //     console.error("Error submitting the report:", error);
    //   }
    // };
  
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/athletes/get-all-athletes");
      setAthletes(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setFormData({ ...formData, attachments: [...formData.attachments, ...files] });
  };
  

  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   setFormData({ ...formData, attachments: [...formData.attachments, ...files] });
  // };


  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (formData.athleteName) {
      submitReport(formData); // Send data to the backend
      navigate("/thank-you"); // Navigate to a thank-you page on success
    } else {
      alert("Please select an athlete or enter the necessary details.");
    }
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#203c5c] mb-4">Whistleblower Reporting Channel</h1>
        <p className="text-[#203c5c] mb-8">
          If you have credible information regarding any suspected doping activities, please use this secure channel to report it.
        </p>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          {/* Report Category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-[#203c5c] text-sm font-semibold mb-2">
              Report Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="shadow-md border rounded w-full py-2 px-3 text-[#203c5c] leading-tight focus:outline-none focus:ring-2 focus:ring-[#203c5c]"
            >
              <option value="Doping">Doping</option>
            </select>
          </div>

          {/* Whistleblower Name */}
          <div className="mb-6">
            <label htmlFor="whistleblowerName" className="block text-[#203c5c] text-sm font-semibold mb-2">
              Your Name (Whistleblower)
            </label>
            <input
              type="text"
              id="whistleblowerName"
              name="whistleblowerName"
              value={formData.whistleblowerName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="shadow-md border rounded w-full py-2 px-3 text-[#203c5c] leading-tight focus:outline-none focus:ring-2 focus:ring-[#203c5c]"
            />
          </div>

          {/* Whistleblower Email */}
          <div className="mb-6">
            <label htmlFor="whistleblowerEmail" className="block text-[#203c5c] text-sm font-semibold mb-2">
              Your Email (Whistleblower)
            </label>
            <input
              type="email"
              id="whistleblowerEmail"
              name="whistleblowerEmail"
              value={formData.whistleblowerEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              className="shadow-md border rounded w-full py-2 px-3 text-[#203c5c] leading-tight focus:outline-none focus:ring-2 focus:ring-[#203c5c]"
            />
          </div>

          {/* Athlete Name */}
          <div className="mb-6">
            <label htmlFor="athleteName" className="block text-[#203c5c] text-sm font-semibold mb-2">
              Athlete Name
            </label>
            <select
              id="athleteName"
              name="athleteName"
              // value={formData.athleteName}
              onChange={handleChange}
              className="shadow-md border rounded w-full py-2 px-3 text-[#203c5c] leading-tight focus:outline-none focus:ring-2 focus:ring-[#203c5c]"
            >
              <option value="" disabled selected>
                Select an athlete
              </option>
              {athletes?.map(item => (
                <option key={item.name} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-[#203c5c] text-sm font-semibold mb-2">
              Additional Information
            </label>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide as much detail as possible. Be specific and descriptive."
              className="shadow-md border rounded w-full py-2 px-3 text-[#203c5c] leading-tight focus:outline-none focus:ring-2 focus:ring-[#203c5c]"
            ></textarea>
          </div>

          {/* Attachments */}
          <div className="mb-6">
            <label htmlFor="attachments" className="block text-[#203c5c] text-sm font-semibold mb-2">
              Attachments (Optional)
            </label>
            <input
              type="file"
              id="attachments"
              name="attachments"
              multiple
              onChange={handleFileChange}
              className="shadow-md border rounded w-full py-2 px-3 text-[#203c5c] leading-tight focus:outline-none focus:ring-2 focus:ring-[#203c5c]"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="bg-[#203c5c] hover:bg-[#2c577a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#2c577a]"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportForm;
