import React, { useState, useEffect } from 'react';
import API from '../api';
import Loader from './Loader';

const TrainerDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await API.get('/bookings/trainer-bookings');
                setBookings(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/bookings/${id}`, { status });
            setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="dashboard-container">
            <h1>Trainer Dashboard</h1>
            <span className="role-badge badge-trainer">Certified Professional Coach</span>
            <h2>Upcoming Sessions</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Trainee</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking._id}>
                            <td>{booking.trainee?.name || 'Deleted User'}</td>
                            <td>{new Date(booking.date).toLocaleDateString()}</td>
                            <td>{booking.timeSlot}</td>
                            <td>
                                <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td>
                                {booking.status === 'Pending' && (
                                    <>
                                        <button onClick={() => updateStatus(booking._id, 'Approved')} className="action-btn btn-approve">Approve</button>
                                        <button onClick={() => updateStatus(booking._id, 'Cancelled')} className="action-btn btn-reject">Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainerDashboard;
