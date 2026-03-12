import React from 'react';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setIsSubmitting(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <div id='contact'>
      <div className='contact-container'>
        <div className='contact-form-section'>
          <h1>CONTACT <span>US</span></h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Full Name' required />
            <input type="email" placeholder='Type Your Email' required />
            <textarea name="message" placeholder='Write Here'></textarea>
            <input type="submit" value={isSubmitting ? 'SENDING...' : 'SEND MESSAGE'} disabled={isSubmitting} />
          </form>
        </div>

        <div className='contact-info-section'>
          <div className='info-item'>
            <h3><MapPin size={24} /> VISIT US</h3>
            <p>Bole Road, Addis Ababa, Ethiopia</p>
          </div>
          <div className='info-item'>
            <h3><Phone size={24} /> CALL US</h3>
            <p>+251 911 223344</p>
          </div>
          <div className='info-item'>
            <h3><Mail size={24} /> EMAIL US</h3>
            <p>info@gymrat.com</p>
          </div>
          <div className='info-item'>
            <h3><Clock size={24} /> OPENING HOURS</h3>
            <div className='hours-grid'>
              <span>Mon - Fri:</span> <span>05:00 AM - 11:00 PM</span>
              <span>Saturday:</span> <span>07:00 AM - 09:00 PM</span>
              <span>Sunday:</span> <span>08:00 AM - 04:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;
