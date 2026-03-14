import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import API from '../api';

function NavBar() {
    const [nav, setNav] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userInfo'));
        if (storedUser) {
            setUserInfo(storedUser);
        } else {
            setUserInfo(null);
            setUnreadCount(0);
        }
    }, [location]);

    // Fetch unread notification count when user is logged in
    useEffect(() => {
        const fetchUnreadCount = async () => {
            if (!userInfo) return;
            try {
                const { data } = await API.get('/notifications');
                const unread = data.filter(n => !n.isRead).length;
                setUnreadCount(unread);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };
        fetchUnreadCount();

        // Poll every 30 seconds for new notifications
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, [userInfo, location]);

    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNav(true);
        } else {
            setNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
        return () => window.removeEventListener('scroll', changeBackground);
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        setUnreadCount(0);
        navigate('/login');
    };

    const isHomePage = location.pathname === '/';
    const isTrainer = userInfo && userInfo.role === 'trainer';
    const isAdmin = userInfo && userInfo.role === 'admin';

    return (
        <nav className={nav ? "nav active" : "nav"}>
            <Link to={isTrainer ? '/trainer-dashboard' : isAdmin ? '/admin-dashboard' : '/'} className='logo'>
                <img src={logo} alt='logo_image' />
            </Link>
            <input className='menu-btn' type='checkbox' id='menu-btn' />
            <label className='menu-icon' htmlFor='menu-btn'>
                <span className='nav-icon'></span>
            </label>
            <ul className='menu'>
                {/* Trainers and Admins don't see Home or landing page links */}
                {!isTrainer && !isAdmin && (
                    <li>
                        {isHomePage ? (
                            <ScrollLink to='main' smooth={true} duration={2000} spy={true} activeClass="active-link">Home</ScrollLink>
                        ) : (
                            <Link to='/' className={location.pathname === '/' ? 'active-link' : ''}>Home</Link>
                        )}
                    </li>
                )}
                {!userInfo && isHomePage && (
                    <>
                        <li><ScrollLink to='features' smooth={true} duration={2000} spy={true} activeClass="active-link">Features</ScrollLink></li>
                        <li><ScrollLink to='presentaion' smooth={true} duration={2000} spy={true} activeClass="active-link">Offers</ScrollLink></li>
                        <li><ScrollLink to='about' smooth={true} duration={2000} spy={true} activeClass="active-link">About</ScrollLink></li>
                        <li><ScrollLink to='contact' smooth={true} duration={2000} spy={true} activeClass="active-link">Contact</ScrollLink></li>
                    </>
                )}

                {userInfo ? (
                    <>
                        {isTrainer && (
                            <li><Link to="/trainer-dashboard" className={location.pathname === '/trainer-dashboard' ? 'active-link' : ''}>Dashboard</Link></li>
                        )}
                        <li>
                            <Link to="/notifications" className={location.pathname === '/notifications' ? 'active-link' : ''} style={{ position: 'relative' }}>
                                Notifications
                                {unreadCount > 0 && (
                                    <span className="notification-badge">{unreadCount}</span>
                                )}
                            </Link>
                        </li>
                        <li><Link to="/profile" className={location.pathname === '/profile' ? 'active-link' : ''}>Profile</Link></li>
                        {userInfo.role === 'admin' && <li><Link to="/admin-dashboard" className={location.pathname === '/admin-dashboard' ? 'active-link' : ''}>Admin</Link></li>}
                        <li><button onClick={logoutHandler} className="logout-btn">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to='/login' className={location.pathname === '/login' ? 'active-link' : ''}>Login</Link></li>
                        <li><Link to='/register' className={`nav-register-btn ${location.pathname === '/register' ? 'active-link' : ''}`}>Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;

