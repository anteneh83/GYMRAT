import React from 'react';
import Header from './Header';
import TrainerBooking from './TrainerBooking';
import Membership from './Membership';
import About from './About';
import Services from './Services';
import Contact from './Contact';

const LandingPage = () => {
    return (
        <>
            <Header />
            <TrainerBooking />
            <Membership />
            <Services />
            <About />
            <Contact />
        </>
    );
};

export default LandingPage;
