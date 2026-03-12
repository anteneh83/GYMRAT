import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import toast from 'react-hot-toast';

import { Loader2 } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('trainee');
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { data } = await API.post('/auth/register', { name, email, password, role });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Registration successful!');
            navigate('/');
            window.location.reload();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="trainee">Trainee</option>
                    <option value="trainer">Trainer</option>
                </select>
                <button type="submit" disabled={isSubmitting} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    {isSubmitting ? <Loader2 className="spinner" size={18} /> : 'Register'}
                </button>
                <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
            </form>
        </div>
    );
};

export default Register;
