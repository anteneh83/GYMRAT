import { Link as ScrollLink } from 'react-scroll';

function FeatureBox(props) {
  return (
    <div className='a-box'>
      <div className='a-b-img'>
        <img src={props.image} alt="" />
      </div>
      <div className='a-b-text'>
        <h2>{props.title}</h2>
        <p>Expert-led sessions designed to push your limits and achieve real results.</p>
        <ScrollLink to="contact" smooth={true} duration={1000} className='header-btn' style={{ fontSize: '0.9rem', width: '140px', height: '40px' }}>GET STARTED</ScrollLink>
      </div>
    </div>
  )
}

export default FeatureBox
