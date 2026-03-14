import React, { useState, useEffect } from 'react';
import API from '../api';
import Loader from './Loader';
import toast from 'react-hot-toast';

const NotificationHistory = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await API.get('/notifications');
                setNotifications(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {
        try {
            await API.put(`/notifications/${id}/read`);
            setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
        } catch (error) {
            console.error(error);
        }
    };

    const clearAll = async () => {
        try {
            await API.delete('/notifications/clear');
            setNotifications([]);
            toast.success('All notifications cleared');
        } catch (error) {
            toast.error('Failed to clear notifications');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="dashboard-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <h1>Notifications</h1>
                {notifications.length > 0 && (
                    <button onClick={clearAll} className="logout-btn" style={{ marginBottom: '20px' }}>
                        Clear All
                    </button>
                )}
            </div>
            <div className="notifications-list">
                {notifications.length === 0 ? <p>No notifications</p> : (
                    notifications.map(notification => (
                        <div key={notification._id} className={`stat-card ${notification.isRead ? '' : 'unread'}`} style={{ borderLeft: notification.isRead ? 'none' : '5px solid #FF1414', textAlign: 'left', marginBottom: '10px' }}>
                            <p style={{ fontSize: '1rem', color: '#fff' }}>{notification.message}</p>
                            <span style={{ fontSize: '0.8rem', color: '#ccc' }}>{new Date(notification.createdAt).toLocaleString()}</span>
                            {!notification.isRead && (
                                <button onClick={() => markAsRead(notification._id)} className="action-btn btn-approve" style={{ float: 'right' }}>Mark as Read</button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationHistory;

