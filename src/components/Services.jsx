import React, { useEffect, useState, useRef } from 'react';
import { CreditCard, Car, Building, Handshake, ShoppingCart, Wheat, Users, Flag } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "NCMC Cards",
      description: "Issue and manage next-generation contactless payment cards with efficient processing and full support.",
      icon: CreditCard,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "FASTag",
      description: "Secure automatic toll payments with easy application, recharge, and activation assistance nationwide.",
      icon: Car,
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Credit Card Services",
      description: "Guidance and support for credit card applications, documentation, and smooth approval processes.",
      icon: CreditCard,
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Financial Inclusion & Banking Support",
      description: "Account opening, mobile banking setup, and GST/TDS guidance for seamless financial access.",
      icon: Building,
      color: "bg-orange-500"
    },
    {
      id: 5,
      title: "E-Commerce Solutions",
      description: "Vendor onboarding, online store setup, and logistics support for smooth digital operations.",
      icon: Handshake,
      color: "bg-red-500"
    },
    {
      id: 6,
      title: "Agriculture Support & Allied Farming",
      description: "Agricultural inputs, market connections, and farmer training for enhanced productivity.",
      icon: ShoppingCart,
      color: "bg-pink-500"
    },
    {
      id: 7,
      title: "Manpower & Recruitment",
      description: "Recruitment, staffing, and training solutions for both permanent and temporary workforce requirements",
      icon: Wheat,
      color: "bg-teal-500"
    },
    {
      id: 8,
      title: "Agents & Channel Partners",
      description: "Register, receive training, and earn commissions by providing services at the local level.",
      icon: Users,
      color: "bg-cyan-500"
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Professional Solutions for Financial, Banking, E-Commerce & Agriculture Needs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering Reliable Services for Individuals, Businesses, and Communities Across India
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id} 
                className={`bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pan India Work Section */}
        <div 
          className={`bg-blue-600 rounded-2xl p-8 text-white transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.8s' }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Pan India Work</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="w-2 h-2 bg-white rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-lg group-hover:text-blue-200 transition-colors duration-300">Metro Work for NCMC Card</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-2 h-2 bg-white rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-lg group-hover:text-blue-200 transition-colors duration-300">FASTag Services Nationwide</span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="flex justify-center lg:justify-end mb-4">
                <Flag size={80} className="text-blue-200 hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-xl font-medium">Serving All States & Union Territories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;