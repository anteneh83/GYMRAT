import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Header() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) {
      setUserInfo(storedUser);
    }
  }, []);

  return (
    <div id='main'>
      <div className='name'>
        <h2>STEP UP YOUR</h2>
        <h1><span>FITNESS</span> WITH US</h1>
        <p className='details'>Build your body and fitness with professional touch. We provide world-class facilities and expert coaching to help you reach your peak performance.</p>
        <div className='header-btns'>
          {userInfo ? (
            <span className='header-btn-welcome'>You are joined, welcome!</span>
          ) : (
            <Link to="/login" className='header-btn'>JOIN US</Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
