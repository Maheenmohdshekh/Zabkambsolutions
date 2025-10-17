import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* CIN Badge */}
            <div 
              className={`inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '0.1s' }}
            >
              CIN: U62020BR2025PTC078141
            </div>

            {/* Main Heading */}
            <h1 
              className={`text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
               Empowering India with Financial, Banking & Agriculture Solutions

            </h1>

            {/* Subtitle */}
            <p 
              className={`text-xl text-gray-600 leading-relaxed transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.3s' }}
            >
              Smooth & Reliable Services for Individuals, Businesses & Communities Nationwide

            </p>

            {/* Description */}
            <p 
              className={`text-lg text-gray-700 leading-relaxed transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              ZABKA MB SOLUTIONS PRIVATE LIMITED brings NCMC Cards, FASTag, Credit Card Assistance, Financial Inclusion, E-Commerce, and Agriculture Support to your fingertips. Simplifying digital and financial solutions while empowering local growth, everywhere in India.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              <a href='#services' className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Explore Services</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a href='#contact' className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                Contact Us
              </a>
            </div>

        {/* Stats */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-gray-200 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.6s' }}
        >
          <div className="text-center group">
            <p className="text-sm text-gray-500 mb-1 group-hover:text-blue-600 transition-colors duration-300">Pan India</p>
            <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Nationwide Coverage</p>
          </div>
          <div className="text-center border-l-0 sm:border-l border-gray-200 sm:pl-8 group">
            <p className="text-sm text-gray-500 mb-1 group-hover:text-blue-600 transition-colors duration-300">Services</p>
            <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">9+ Solutions</p>
          </div>
          <div className="text-center border-l-0 sm:border-l border-gray-200 sm:pl-8 group">
            <p className="text-sm text-gray-500 mb-1 group-hover:text-blue-600 transition-colors duration-300">Support</p>
            <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">24/7 Available</p>
          </div>
        </div>
          </div>

          {/* Right Content - Image */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '0.7s' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="ZABKA MB Solutions"
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Trusted Partner Badge */}
            <div 
              className={`absolute -bottom-6 -left-6 bg-white border border-gray-200 rounded-xl p-4 shadow-lg transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1s' }}
            >
              <p className="text-sm text-gray-500 mb-1">Trusted Partner</p>
              <p className="text-2xl font-bold text-gray-900">NICT TPL</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
