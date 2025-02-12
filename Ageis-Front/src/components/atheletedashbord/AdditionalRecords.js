import React from 'react';

const AdditionalRecords = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-black mb-10">
          Additional Records Management
        </h1>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-black">Overview</h2>
          <p className="mt-4 text-black leading-relaxed">
            Keep track of all supplementary athlete data with ease. Whether it's medical history, training logs, or compliance information, our system allows you to add, update, and share records securely and efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add Records */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold text-black">Add New Records</h3>
            <p className="mt-2 text-black">
              Add new entries such as medical history, performance stats, or other relevant data.
            </p>
            <button className="mt-4 px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2 transition duration-200">
              Add Records
            </button>
          </div>

          {/* Manage Records */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold text-black">View and Manage Records</h3>
            <p className="mt-2 text-black">
              Update, review, or delete outdated records easily with our tools.
            </p>
            <button className="mt-4 px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2 transition duration-200">
              Manage Records
            </button>
          </div>

          {/* Bulk Import/Export */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold text-black">Bulk Import/Export</h3>
            <p className="mt-2 text-black">
              Save time with bulk operations to import or export athlete data in one go.
            </p>
            <div className="flex space-x-4 mt-4">
              <button className="px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2 transition duration-200">
                Import Records
              </button>
              <button className="px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2 transition duration-200">
                Export Records
              </button>
            </div>
          </div>

          {/* Secure Sharing */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold text-black">Secure Sharing</h3>
            <p className="mt-2 text-black">
              Share records securely with authorized personnel while ensuring data privacy.
            </p>
            <button className="mt-4 px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2 transition duration-200">
              Share Records
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] focus:outline-none focus:ring-2 focus:ring-[#203c5c] focus:ring-offset-2 transition duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalRecords;