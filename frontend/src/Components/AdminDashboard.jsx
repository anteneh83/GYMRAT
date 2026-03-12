import React, { useState, useEffect } from 'react';
import API from '../api';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const statsRes = await API.get('/admin/stats');
                const usersRes = await API.get('/admin/users');
                setStats(statsRes.data);
                setUsers(usersRes.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    if (loading) return <div className="dashboard-container">Loading...</div>;

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <span className="role-badge badge-admin">Platform Systems Administrator</span>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Members</h3>
                    <p>{stats?.totalMembers}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Trainers</h3>
                    <p>{stats?.totalTrainers}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p>ETB {stats?.totalRevenue}</p>
                </div>
            </div>

            <h2>User Management</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button className="action-btn btn-reject">Suspend</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
