import React, { useState } from 'react';

const PartnerRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interests: [],
    notes: ''
  });

  const interestOptions = [
    'NCMC Card',
    'FASTag',
    'Banking Support',
    'Agriculture Support',
    'E-Commerce',
    'E-Governance'
  ];

  const partnerBenefits = [
    'Attractive commission structure',
    'Comprehensive training modules',
    'Marketing & sales support',
    'Dedicated partner portal',
    'Timely payout system'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(item => item !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section id="partner" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Partnership Opportunity
          </div>
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-6">
            Become an Agent / Channel Partner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us as a partner and provide services at the local level. Earn attractive commissions and grow your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Partner Registration Form</h3>
              </div>
              <p className="text-gray-600 mb-8">Fill out the form below to start your journey with us</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Phone and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9718412563"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Areas of Interest */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Areas of Interest *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {interestOptions.map((interest) => (
                      <label key={interest} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes / Area Details
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Tell us about your area, experience, or any specific requirements..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Registration
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* Partner Benefits */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Benefits</h3>
              <ul className="space-y-3">
                {partnerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Help */}
            <div className="bg-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-blue-100 mb-4">
                Contact our partnership team for assistance
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-200">📞</span>
                  <span className="text-sm">011 7121 8473</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-200">✉️</span>
                  <span className="text-sm">MAHEENMOHD3@OUTLOOK.COM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerRegistration;
