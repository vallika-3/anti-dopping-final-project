import React from "react";

function ThankYouPage() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#203c5c] mb-4">Report Submitted</h1>
        <p className="text-[#203c5c] mb-8">
          Thank you for submitting your report. Your information will be reviewed by our team.
        </p>
        <a
          href="/"
          className="bg-[#203c5c] hover:bg-[#2c577a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#2c577a]"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
}

export default ThankYouPage;