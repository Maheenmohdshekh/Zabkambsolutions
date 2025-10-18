import React, { useEffect, useState, useRef } from 'react';
import { 
  CreditCard, 
  Car, 
  Building, 
  Handshake, 
  ShoppingCart, 
  Wheat, 
  Users, 
  Flag 
} from 'lucide-react';

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
      title: "NCMC Cards",
      description: "National Common Mobility Cards for seamless travel across India",
      icon: CreditCard,
      color: "bg-blue-500"
    },
    {
      title: "FASTag Solutions",
      description: "Electronic toll collection for hassle-free highway travel",
      icon: Car,
      color: "bg-green-500"
    },
    {
      title: "Banking Support",
      description: "Comprehensive banking services and financial solutions",
      icon: Building,
      color: "bg-purple-500"
    },
    {
      title: "E-Governance",
      description: "Digital government services and citizen facilitation",
      icon: Handshake,
      color: "bg-orange-500"
    },
    {
      title: "E-Commerce",
      description: "Online marketplace and digital commerce solutions",
      icon: ShoppingCart,
      color: "bg-pink-500"
    },
    {
      title: "Agriculture Support",
      description: "Digital solutions for farmers and agricultural development",
      icon: Wheat,
      color: "bg-yellow-500"
    },
    {
      title: "Community Services",
      description: "Local community development and support programs",
      icon: Users,
      color: "bg-indigo-500"
    },
    {
      title: "Pan India Coverage",
      description: "Services available across all states and union territories",
      icon: Flag,
      color: "bg-cyan-500"
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
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
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
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
              <h3 className="text-3xl font-bold mb-6">Pan India Work</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Metro Work for NCMC Card</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">FASTag Services Nationwide</span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="flex justify-center lg:justify-end mb-4">
                <span className="text-6xl">🇮🇳</span>
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
