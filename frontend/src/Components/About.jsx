import React from 'react'
import aboutimage from '../images/about.png';

function About() {
  return (
    <div id='about'>
      <div className='about-text'>
        <h1>LEARN MORE <span>ABOUT US</span></h1>
        <p>At GYM RAT, we believe fitness is more than just a workout—it's a lifestyle. Founded by veterans of the industry, our mission is to provide an inclusive, high-energy environment where every member can achieve their personal best. From olympic-level weightlifting to high-intensity functional training, our programs are designed to push your boundaries and deliver real results. Our community is built on discipline, strength, and mutual support.</p>
        <button>READ MORE</button>
      </div>
      <div className='about-image'>
        <img src={aboutimage} alt='' />
      </div>
    </div>
  )
}

export default About
