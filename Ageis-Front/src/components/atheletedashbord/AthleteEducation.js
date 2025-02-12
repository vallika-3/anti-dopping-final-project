import React from 'react';

const AthleteEducation = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-black mb-8">
          Anti-Doping Education for Athletes
        </h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-black">Introduction to Anti-Doping</h2>
          <p className="mt-4 text-black leading-relaxed">
            As an athlete, it's essential to understand the importance of clean sport. This page provides key educational resources and guides on how you can comply with anti-doping regulations and protect your career from accidental violations.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black">Key Areas of Focus</h3>
          <ul className="list-disc pl-6 mt-4 text-black">
            <li>Understanding Prohibited Substances</li>
            <li>The Importance of Therapeutic Use Exemptions (TUEs)</li>
            <li>Consequences of Doping Violations</li>
            <li>Safe and Responsible Medication Use</li>
            <li>Report Suspicious Activity Securely</li>
          </ul>
        </div>

        <div className="space-y-8">
          {/* Interactive Learning Tools */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 border border-gray-300">
            <h4 className="text-lg font-semibold text-black mb-4">Interactive Learning Tools</h4>
            <p className="text-black mb-4">
              Explore various learning tools to help you understand the anti-doping rules and responsibilities better.
            </p>
            <ul className="list-none space-y-4">
              <li>
                <button className="w-full px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] transition duration-200">
                  🎥 Watch Video on Doping Risks
                </button>
              </li>
              <li>
                <button className="w-full px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] transition duration-200">
                  📝 Take the Anti-Doping Quiz
                </button>
              </li>
              <li>
                <button className="w-full px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] transition duration-200">
                  📚 Case Study: Real-Life Anti-Doping Violation
                </button>
              </li>
            </ul>
          </div>

          {/* Key Regulatory Updates */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 border border-gray-300">
            <h4 className="text-lg font-semibold text-black mb-4">Key Regulatory Updates</h4>
            <p className="text-black mb-4">
              Stay updated on changes to the list of prohibited substances and Therapeutic Use Exemption procedures. Our system automatically keeps track of all regulatory shifts.
            </p>
            <button className="w-full px-4 py-2 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] transition duration-200">
              View Latest Regulatory Updates
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-10 text-center">
          <button className="px-6 py-3 bg-[#203c5c] text-white rounded-md hover:bg-[#182d46] transition duration-200">
            Contact Support or Report Issues
          </button>
        </div>
      </div>
    </div>
  );
};

export default AthleteEducation;