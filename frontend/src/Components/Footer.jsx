import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <h2>GYM<span>RAT</span></h2>
          <p>Elevating your fitness journey with expert-led training, state-of-the-art facilities, and a community dedicated to your success. Join the rat race to greatness.</p>
          <div className="social-icons">
            <a href="#!"><Facebook size={20} /></a>
            <a href="#!"><Instagram size={20} /></a>
            <a href="#!"><Twitter size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><ScrollLink to="main" smooth={true} duration={1000}>Home</ScrollLink></li>
            <li><ScrollLink to="features" smooth={true} duration={1000}>Trainers</ScrollLink></li>
            <li><ScrollLink to="presentaion" smooth={true} duration={1000}>Memberships</ScrollLink></li>
            <li><ScrollLink to="about" smooth={true} duration={1000}>About Us</ScrollLink></li>
            <li><ScrollLink to="contact" smooth={true} duration={1000}>Contact</ScrollLink></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Our Programs</h3>
          <ul>
            <li><a href="#!">Weightlifting</a></li>
            <li><a href="#!">Cardio & Endurance</a></li>
            <li><a href="#!">Yoga & Flexibility</a></li>
            <li><a href="#!">Personal Coaching</a></li>
            <li><a href="#!">Group Workouts</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Get In Touch</h3>
          <p><MapPin size={18} /> Bole Road, Addis Ababa, Ethiopia</p>
          <p><Phone size={18} /> +251 911 223344</p>
          <p><Mail size={18} /> info@gymrat.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GYM RAT Platform. All Rights Reserved. Built for Champions.</p>
      </div>
    </footer>
  );
}

export default Footer;
