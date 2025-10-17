import React from 'react';

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Field Agent",
      location: "Nationwide",
      type: "Full-time",
      icon: "👤",
      requirements: [
        "Smartphone",
        "Basic computer knowledge",
        "Good communication skills"
      ],
      responsibilities: [
        "NCMC/FASTag sales",
        "Customer onboarding",
        "Local area support"
      ]
    },
    {
      id: 2,
      title: "Office/Back-office Staff",
      location: "Delhi / Muzaffarpur",
      type: "Full-time",
      icon: "💼",
      requirements: [
        "Computer proficiency",
        "Excel knowledge",
        "Documentation skills"
      ],
      responsibilities: [
        "Documentation",
        "Reporting",
        "Data entry & Excel work"
      ]
    }
  ];

  const benefits = [
    "Competitive Earnings:Transparent salary with an attractive commission structure",
    "Professional Growth:Training, certifications, and ongoing skill development.",
    "Pan‑India Opportunities:Work nationwide with strong local field and back-office support.",
    "Digital Impact: Contribute to payments, financial inclusion.",
  ];

  return (
    <section id="careers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Join Our Team
          </div>
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-6">
            Career Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join Our Team and Grow with ZABKA MB SOLUTIONS PRIVATE LIMITED

          </p>
        </div>

        {/* Job Openings */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {jobOpenings.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl p-8 shadow-lg">
              {/* Job Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl">
                  {job.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {job.location}
                    </span>
                    <span className="border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements:</h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities:</h4>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      <span className="text-gray-600">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Why Work With Us */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Work With Us?</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Team working together"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
