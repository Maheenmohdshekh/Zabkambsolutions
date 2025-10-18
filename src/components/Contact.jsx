import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Phone, Mail, MapPin, Building, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    number: '',
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

  const validate = () => {
    let isValid = true;
    let newErrors = { name: '', email: '', number: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsDisabled(true);
    
    try {
      const response = await axios.post('/api/contactApis', formData);
      
      if (response.data.isSuccess) {
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent successfully. We will get back to you soon.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          number: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error sending your message. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsDisabled(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["011 7121 8473"]
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["MAHEENMOHD3@OUTLOOK.COM"]
    },
    {
      icon: MapPin,
      title: "Local Office",
      details: [
        "E11A/198, Shastri Park",
        "Near HP Petrol Pump",
        "Delhi – 110053"
      ]
    },
    {
      icon: Building,
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
      icon: Phone,
      title: "Call Us",
      subtitle: "Available 24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      subtitle: "Quick Response"
    },
    {
      icon: CheckCircle,
      title: "Coverage",
      subtitle: "Pan India Service"
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gray-100 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Get in Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message, and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            className={`bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-lg transition-all duration-1000 ${
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
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
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {errors.number && (
                    <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                  )}
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
                  rows="5"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isDisabled}
                className="w-full bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                {!isDisabled ? (
                  <>
                    <span>Send Message</span>
                    <Send size={20} />
                  </>
                ) : (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div 
            className={`bg-blue-600 rounded-2xl p-6 lg:p-8 text-white transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
            <p className="text-blue-100 mb-8">
              We're here to help and answer any question you might have. We look forward to hearing from you!
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <IconComponent size={20} />
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
                );
              })}

              {/* Response Time */}
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center">
                    <Clock size={20} className="text-blue-200" />
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
          {supportFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className={`bg-gray-50 rounded-2xl p-6 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <IconComponent size={40} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;