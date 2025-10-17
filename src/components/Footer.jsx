import React, { useEffect, useState } from 'react';
import logo from '../assets/Zabka MB Solutions (1).png';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const quickLinks = [
    'Our Services',
    'Careers',
    'Become a Partner',
    'Contact Us'
  ];

  const services = [
    'NCMC Cards',
    'FASTag Solutions',
    'Banking Support',
    'E-Governance',
    'Agriculture Support',
    'E-Commerce Solutions'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div 
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="ZABKA MB Solutions" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">ZABKA MB</h3>
                <p className="text-sm text-gray-400">SOLUTIONS PVT LTD</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Banking, Digital and Agriculture Solutions for a Better Tomorrow
            </p>
            <p className="text-sm text-gray-400">
              CIN: U62020BR2025PTC078141
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-gray-400 mt-1">📞</span>
                <div>
                  <p className="text-gray-300">011 7121 8473</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gray-400 mt-1">✉️</span>
                <div>
                  <p className="text-gray-300">MAHEENMOHD3@OUTLOOK.COM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-3">
              <span className="text-gray-400 mt-1">📍</span>
              <div>
                <p className="text-gray-300 font-medium mb-1">Local Address:</p>
                <p className="text-gray-400 text-sm">
                  E11A/198, Shastri Park, Near HP Petrol Pump and Phone Booth, Delhi – 110053
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-gray-400 mt-1">🏢</span>
              <div>
                <p className="text-gray-300 font-medium mb-1">Registered Office:</p>
                <p className="text-gray-400 text-sm">
                  C/o Naseema Khatoon, W.No.8, Khasra 477, PO Bandhpura, Katra, Muzaffarpur, Bihar – 843321
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 ZABKA MB SOLUTIONS PRIVATE LIMITED — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
