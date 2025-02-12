import React, { useRef } from 'react';

const TueManagement = () => {
  const fileInputRef = useRef(null); // Reference to the hidden file input

  // Trigger file input click event for submitting application
  const handleSubmitApplicationClick = () => {
    fileInputRef.current.click(); // Open the file explorer
  };

  // Trigger file input click event for uploading documents
  const handleUploadDocumentsClick = () => {
    fileInputRef.current.click(); // Open the file explorer
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-black mb-8">
          TUE Management
        </h1>

        {/* Overview Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-black">Overview</h2>
          <p className="mt-4 text-black leading-relaxed">
            TUE (Therapeutic Use Exemption) allows athletes with a medical condition to use a prohibited substance or method, strictly under medical supervision. This section helps you manage TUE applications, updates, and approvals efficiently and securely.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Submit TUE Application */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold text-black">Submit TUE Application</h3>
            <p className="mt-2 text-black">
              Start the process by submitting a new application for Therapeutic Use Exemption with the required medical documentation.
            </p>
            <button
              onClick={handleSubmitApplicationClick} // Trigger file explorer
              className="mt-4 px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2"
              aria-label="Submit a new TUE application"
            >
              Submit Application
            </button>
          </div>

          {/* Review TUE Status */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold text-black">Review Application Status</h3>
            <p className="mt-2 text-black">
              Track the progress of your TUE applications and stay informed about approval or additional requirements.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2"
              aria-label="Check the status of your TUE applications"
            >
              Check Status
            </button>
          </div>

          {/* Upload Additional Documents */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold text-black">Upload Additional Documents</h3>
            <p className="mt-2 text-black">
              Upload any additional medical records or supporting documents requested by the TUE committee.
            </p>
            <button
              onClick={handleUploadDocumentsClick} // Trigger file explorer
              className="mt-4 px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2"
              aria-label="Upload documents for your TUE application"
            >
              Upload Documents
            </button>
          </div>

          {/* View Approved TUEs */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold text-black">View Approved TUEs</h3>
            <p className="mt-2 text-black">
              Access a list of all your approved TUEs, including validity dates and relevant details.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2"
              aria-label="View the list of approved TUEs"
            >
              View Approved TUEs
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-black">
            Need help with your TUE application or have questions about the process?
          </p>
          <button
            className="mt-4 px-6 py-3 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2"
            aria-label="Contact support for TUE-related inquiries"
          >
            Contact Support
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef} // Reference to the hidden file input
          style={{ display: 'none' }} // Hide the file input
        />
      </div>
    </div>
  );
};

export default TueManagement;