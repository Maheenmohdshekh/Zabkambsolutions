import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import Careers from './Careers';
import PartnerRegistration from './PartnerRegistration';
import Contact from './Contact';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className=" bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Careers />
        <PartnerRegistration />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
