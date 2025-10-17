import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { User, Phone, Mail, CheckCircle, Send, MapPin, Building, Award } from 'lucide-react';

const PartnerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interests: [],
    notes: ''
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    interests: '',
    notes: ''
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

  const interestOptions = [
    'NCMC Card',
    'FASTag',
    'Banking Support',
    'Agriculture Support',
    'E-Commerce',
    'E-Governance'
  ];

  const validate = () => {
    let isValid = true;
    let newErrors = { name: '', phone: '', email: '', interests: '', notes: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one area of interest';
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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value)
    }));
    
    if (errors.interests) {
      setErrors(prev => ({
        ...prev,
        interests: ''
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
      const response = await axios.post('/api/partnerApis', formData);
      
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Your partnership application has been submitted successfully. We will contact you soon.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        
        setFormData({
          name: '',
          phone: '',
          email: '',
          interests: [],
          notes: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting your application. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <section ref={sectionRef} id="partner-registration" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Partnership Opportunity
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Become an Agent / Channel Partner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us as a partner and provide services at the local level. Earn attractive commissions and grow your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div 
              className={`bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                  <User size={16} className="text-white" />
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
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
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
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
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
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Areas of Interest */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Interest *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {interestOptions.map((interest, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`interest-${index}`}
                          name="interests"
                          value={interest}
                          checked={formData.interests.includes(interest)}
                          onChange={handleInterestChange}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`interest-${index}`} className="ml-2 text-sm text-gray-700">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.interests && (
                    <p className="text-red-500 text-sm mt-1">{errors.interests}</p>
                  )}
                </div>

                {/* Notes / Area Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes / Area Details
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Tell us about your area, experience, or any specific requirements..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  {!isDisabled ? (
                    <>
                      <span>Submit Registration</span>
                      <Send size={20} />
                    </>
                  ) : (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Partner Benefits */}
            <div 
              className={`bg-white border border-green-200 rounded-2xl p-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              <h3 className="text-lg font-semibold mb-6 text-gray-900">Partner Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm">Attractive commission structure</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm">Comprehensive training modules</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm">Marketing & sales support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm">Dedicated partner portal</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm">Timely payout system</span>
                </li>
              </ul>
            </div>

            {/* Need Help */}
            <div 
              className={`bg-blue-600 rounded-2xl p-6 text-white transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '0.6s' }}
            >
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-blue-100 mb-6">
                Contact our partnership team for assistance
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-blue-200" />
                  <span className="text-sm">011 7121 8473</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-blue-200" />
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