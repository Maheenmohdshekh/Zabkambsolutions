import React, { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "Phone Numbers",
      details: ["011 7121 8473"]
    },
    {
      icon: "✉️",
      title: "Email Address",
      details: ["MAHEENMOHD3@OUTLOOK.COM"]
    },
    {
      icon: "📍",
      title: "Local Office",
      details: [
        "E11A/198, Shastri Park",
        "Near HP Petrol Pump",
        "Delhi – 110053"
      ]
    },
    {
      icon: "🏢",
      title: "Registered Office",
      details: [
        "C/o Naseema Khatoon",
        "W.No.8, Khasra 477",
        "PO Bandhpura, Katra",
        "Muzaffarpur, Bihar – 843321"
      ]
    }
  ];

  const supportFeatures = [
    {
      icon: "📞",
      title: "Call Us",
      subtitle: "Available 24/7"
    },
    {
      icon: "✉️",
      title: "Email Support",
      subtitle: "Quick Response"
    },
    {
      icon: "🇮🇳",
      title: "Coverage",
      subtitle: "Pan India Service"
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Get in Touch
          </div>
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're here to help you with all your queries and service needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            className={`bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-lg order-2 lg:order-1 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
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
                  placeholder="John Doe"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email and Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>

              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div 
            className={`bg-blue-600 rounded-2xl p-6 lg:p-8 text-white order-1 lg:order-2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <h3 className="text-3xl font-bold mb-6">Let's Connect</h3>
            <p className="text-blue-100 mb-8">
              We're here to help and answer any question you might have. We look forward to hearing from you!
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{info.title}</h4>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-blue-100 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Response Time */}
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center">
                    <span className="text-blue-200">⏱️</span>
                  </div>
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-blue-100 text-sm">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Features */}
        <div 
          className={`grid md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.6s' }}
        >
          {supportFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-gray-50 rounded-2xl p-6 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.7 + index * 0.1}s` }}
            >
              <div className="text-4xl mb-4 hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
