import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Building, ArrowRight, Linkedin } from 'lucide-react';
import logo from '../assets/Zabka MB Solutions (1).png';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <footer id="footer" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Zabka MB Solutions Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">ZABKA MB SOLUTIONS</h3>
                <p className="text-sm text-gray-400">Private Limited</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Banking, Digital and Agriculture Solutions for a Better Tomorrow
            </p>
            <p className="text-sm text-gray-400 mb-4">
              CIN: U62020BR2025PTC078141
            </p>
            {/* <div className="flex items-center space-x-4">
              <a 
                href="https://linkedin.com/company/zabka-mb-solutions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div> */}
          </div>



          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('careers')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('partner-registration')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Become a Partner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">NCMC Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">FASTag Solutions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Banking Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">E-Governance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Agriculture Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">E-Commerce Solutions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone size={16} className="text-gray-400 mt-1" />
                <div>
                  <a 
                    href="tel:+911171218473" 
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    011 7121 8473
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={16} className="text-gray-400 mt-1" />
                <div>
                  <a 
                    href="mailto:MAHEENMOHD3@OUTLOOK.COM" 
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    MAHEENMOHD3@OUTLOOK.COM
                  </a>
                </div>
              </div>
              {/* <div className="flex items-start space-x-3">
                <Linkedin size={16} className="text-gray-400 mt-1" />
                <div>
                  <a 
                    href="https://linkedin.com/company/zabka-mb-solutions" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-3">
              <MapPin size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-gray-300 font-medium mb-1">Local Address:</p>
                <p className="text-gray-400 text-sm">
                  E11A/198, Shastri Park, Near HP Petrol Pump and Phone Booth, Delhi – 110053
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Building size={16} className="text-gray-400 mt-1" />
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