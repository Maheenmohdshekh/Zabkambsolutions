import React from 'react';
import { ArrowRight, Phone, Mail, Menu, X } from 'lucide-react';
import logo from '../assets/Zabka MB Solutions (1).png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className=" border-b border-gray-200 sticky top-0 z-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between h-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-42 h-14 sm:w-42 sm:h-16 flex items-center justify-center">
              <img 
                src={logo} 
                alt="ZABKA MB Solutions" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm sm:text-lg font-semibold text-gray-900">ZABKA MB SOLUTIONS</h1>
              <p className="text-xs text-gray-500">Private Limited</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-semibold text-gray-900">ZABKA MB SOLUTIONS</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('careers')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Careers
            </button>
            <button 
              onClick={() => scrollToSection('partner-registration')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Partner
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          {/* Desktop CTA Button & Quick Contact */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Quick Contact Info */}
            {/* <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
              <a href="tel:+911171218473" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <Phone size={14} />
                <span>011 7121 8473</span>
              </a>
              <a href="mailto:MAHEENMOHD3@OUTLOOK.COM" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <Mail size={14} />
                <span>Email</span>
              </a>
            </div> */}

            {/* Get Started Button */}
            <button
              onClick={scrollToContact}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Phone size={16} />
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Quick Contact Info for Mobile */}
            {/* <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
              <a href="tel:+911171218473" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <Phone size={16} />
                <span>011 7121 8473</span>
              </a>
              <a href="mailto:MAHEENMOHD3@OUTLOOK.COM" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <Mail size={16} />
                <span>Email</span>
              </a>
            </div> */}

            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('careers')}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-left"
              >
                Careers
              </button>
              <button 
                onClick={() => scrollToSection('partner-registration')}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-left"
              >
                Partner
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-left"
              >
                Contact
              </button>
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium w-full mt-4 shadow-lg hover:shadow-xl"
              >
                <Phone size={16} />
                <span>Get Started</span>
                <ArrowRight size={16} />
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;