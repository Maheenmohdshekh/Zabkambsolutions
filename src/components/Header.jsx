import React from 'react';
import logo from '../assets/Zabka MB Solutions (1).png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className="bg-white/95 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between h-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-12 h-12 sm:w-14 sm:h-16 flex items-center justify-center">
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
              <h1 className="text-sm font-semibold text-gray-900">ZABKA MB</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">
              Services
            </a>
            <a href="#careers" className="text-gray-600 hover:text-gray-900 transition-colors">
              Careers
            </a>
            <a href="#partner" className="text-gray-600 hover:text-gray-900 transition-colors">
              Partner
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop CTA Button */}
          <button className="hidden sm:block bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Services
              </a>
              <a href="#careers" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Careers
              </a>
              <a href="#partner" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Partner
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full mt-4">
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
