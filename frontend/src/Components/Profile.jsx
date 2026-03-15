import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../api';
import toast from 'react-hot-toast';
import Loader from './Loader';

const Profile = () => {
    const [progress, setProgress] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [newStats, setNewStats] = useState({ weight: '', bmi: '' });

    useEffect(() => {
        const fetchTraineeData = async () => {
            try {
                const progressRes = await API.get('/progress/my-progress');
                const bookingsRes = await API.get('/bookings/my-bookings');
                setProgress(progressRes.data);
                setBookings(bookingsRes.data);
                if (progressRes.data.length > 0) {
                    setNewStats({
                        weight: progressRes.data[0].weight,
                        bmi: progressRes.data[0].bmi
                    });
                }
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load profile data');
                setLoading(false);
            }
        };
        fetchTraineeData();
    }, []);

    if (loading) return <Loader />;

    const handleUpdateStats = async (e) => {
        e.preventDefault();
        try {
            await API.post('/progress', newStats);
            toast.success('Stats updated successfully!');
            setEditMode(false);
            // Refresh data
            const progressRes = await API.get('/progress/my-progress');
            setProgress(progressRes.data);
        } catch (error) {
            toast.error('Failed to update stats');
        }
    };

    const chartData = progress.map(p => ({
        date: new Date(p.date).toLocaleDateString(),
        weight: p.weight,
        bmi: p.bmi
    })).reverse();

    return (
        <div className="dashboard-container">
            <h1>My Profile</h1>
            <span className="role-badge badge-trainee">Active Trainee Member</span>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Weight</h3>
                    {editMode ? (
                        <input
                            type="number"
                            value={newStats.weight}
                            onChange={(e) => setNewStats({ ...newStats, weight: e.target.value })}
                            style={{ background: '#333', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px', width: '80px' }}
                        />
                    ) : (
                        <p>{progress[0]?.weight || '--'} kg</p>
                    )}
                </div>
                <div className="stat-card">
                    <h3>BMI</h3>
                    {editMode ? (
                        <input
                            type="number"
                            step="0.1"
                            value={newStats.bmi}
                            onChange={(e) => setNewStats({ ...newStats, bmi: e.target.value })}
                            style={{ background: '#333', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px', width: '80px' }}
                        />
                    ) : (
                        <p>{progress[0]?.bmi || '--'}</p>
                    )}
                </div>
                <div className="stat-card">
                    <h3>Sessions</h3>
                    <p>{bookings.length}</p>
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                {editMode ? (
                    <>
                        <button onClick={handleUpdateStats} className="action-btn" style={{ marginRight: '10px' }}>Save Stats</button>
                        <button onClick={() => setEditMode(false)} className="action-btn" style={{ background: '#444' }}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setEditMode(true)} className="action-btn">Update Stats</button>
                )}
            </div>

            <div className="chart-container" style={{ width: '100%', height: 300, backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                <h3 style={{ color: '#FF1414', marginBottom: '10px' }}>Weight Progress</h3>
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                        <Line type="monotone" dataKey="weight" stroke="#FF1414" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <h2>My Bookings</h2>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Trainer</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking.trainer.name}</td>
                                <td>{new Date(booking.date).toLocaleDateString()}</td>
                                <td>{booking.timeSlot}</td>
                                <td>
                                    <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;
