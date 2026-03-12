import { Link as ScrollLink } from 'react-scroll';

function Offer() {
  return (
    <div id='presentaion'>
      <div className='pr-heading'>
        <h1>A BIG <span> OFFER </span>FOR THIS SUMMER</h1>
        <p className='details'>
          Join today and get 50% off your first 3 months. Limited time offer!
        </p>
        <div className='pr-btns'>
          <ScrollLink to="contact" smooth={true} duration={1000} className='pr-btn'>JOIN NOW</ScrollLink>
        </div>
      </div>
    </div>
  )
}

export default Offer
