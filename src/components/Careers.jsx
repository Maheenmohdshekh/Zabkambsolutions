import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { User, Briefcase, X, FileText, MapPin, Clock, CheckCircle, Send, Award, Users, Target } from 'lucide-react';

const Careers = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    location: '',
    skills: '',
    coverLetter: '',
    resume: ''
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    location: '',
    skills: '',
    coverLetter: ''
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

  const jobOpenings = [
    {
      id: 1,
      title: "Field Agent",
      location: "Nationwide",
      type: "Full-time",
      icon: User,
      requirements: [
        "Smartphone",
        "Basic computer knowledge",
        "Good communication skills"
      ],
      responsibilities: [
        "NCMC/FASTag sales",
        "Customer onboarding",
        "Local area support"
      ]
    },
    {
      id: 2,
      title: "Office/Back-office Staff",
      location: "Delhi / Muzaffarpur",
      type: "Full-time",
      icon: Briefcase,
      requirements: [
        "Computer proficiency",
        "Excel knowledge",
        "Documentation skills"
      ],
      responsibilities: [
        "Documentation",
        "Reporting",
        "Data entry & Excel work"
      ]
    }
  ];

  const benefits = [
    "Competitive Earnings: Transparent salary with an attractive commission structure",
    "Professional Growth: Training, certifications, and ongoing skill development.",
    "Pan‑India Opportunities: Work nationwide with strong local field and back-office support.",
    "Impactful Work: Contribute to India's digital and financial inclusion revolution."
  ];

  const validate = () => {
    let isValid = true;
    let newErrors = { fullName: '', email: '', phone: '', position: '', experience: '', location: '', skills: '', coverLetter: '' };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
      isValid = false;
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    if (!formData.skills.trim()) {
      newErrors.skills = 'Skills are required';
      isValid = false;
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
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

  const handleApply = (position) => {
    setSelectedPosition(position);
    setFormData(prev => ({
      ...prev,
      position: position
    }));
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedPosition('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      location: '',
      skills: '',
      coverLetter: '',
      resume: ''
    });
    setErrors({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      location: '',
      skills: '',
      coverLetter: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsDisabled(true);
    
    try {
      const response = await axios.post('/api/careerApis', formData);
      
      if (response.data.isSuccess) {
        Swal.fire({
          title: 'Success!',
          text: 'Your application has been submitted successfully. We will contact you soon.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        
        closeDialog();
      }
    } catch (error) {
      console.error('Error submitting application:', error);
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
    <>
      <section ref={sectionRef} id="careers" className="py-20 bg-white overflow-x-hidden w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* Section Header */}
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Join Our Team
          </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Career Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join India's fastest-growing digital and banking solutions provider.
          </p>
        </div>

        {/* Job Openings */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {jobOpenings.map((job, index) => {
              const IconComponent = job.icon;
              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-1000 hover:shadow-xl ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
                >
              {/* Job Header */}
              <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <IconComponent size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                          <MapPin size={14} className="mr-1" />
                      {job.location}
                    </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                          <Clock size={14} className="mr-1" />
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>

                  {/* Job Details */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Requirements:</h4>
                      <ul className="space-y-2 text-gray-600">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Responsibilities:</h4>
                      <ul className="space-y-2 text-gray-600">
                        {job.responsibilities.map((res, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{res}</span>
                    </li>
                  ))}
                </ul>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => handleApply(job.title)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FileText size={20} />
                    <span>Apply Now</span>
                  </button>
                </div>
              );
            })}
              </div>

          {/* Why Work With Us Section */}
          <div 
            className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.5s' }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Why Work With Us?</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center lg:text-right">
                <div className="flex justify-center lg:justify-end mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Team"
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Application Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999999999] p-4">
          <div className="bg-white rounded-2xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl w-full md:w-3xl max-h-[90vh] overflow-hidden">
            {/* Dialog Header - Sticky with Zabka branding */}
            <div className="sticky top-0 bg-blue-600 text-white p-4 sm:p-6 border-b border-blue-500">
              <div className="flex items-center justify-between">
            <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Apply for {selectedPosition}</h3>
                  <p className="text-blue-100 text-sm sm:text-base">Fill out the form below to submit your application</p>
                </div>
                <button
                  onClick={closeDialog}
                  className="p-2 hover:bg-blue-700 cursor-pointer rounded-lg transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
                    </div>
            </div>

            {/* Dialog Content - Scrollable */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Full Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
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
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      required
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
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
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone and Experience */}
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
                      placeholder="9876543210"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience *
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="e.g., 2 years in sales"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      required
                    />
                    {errors.experience && (
                      <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Delhi, Mumbai, Remote"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills *
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="List your relevant skills and qualifications"
                    rows={3}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    required
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
                  )}
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Tell us why you want to join our team and what makes you a great fit for this position"
                    rows={4}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    required
                  />
                  {errors.coverLetter && (
                    <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>
                  )}
                </div>

                {/* Resume Link (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Link (Optional)
                  </label>
                  <input
                    type="url"
                    name="resume"
                    value={formData.resume}
                    onChange={handleInputChange}
                    placeholder="Link to your online resume (e.g., LinkedIn, personal website)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="px-6 w-full cursor-pointer py-3 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="w-full cursor-pointer bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    {!isDisabled ? (
                      <>
                        <Send size={20} />
                        <span>Submit Application</span>
                      </>
                    ) : (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Careers;