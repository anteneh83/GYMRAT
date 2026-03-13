import React, { useState, useEffect } from 'react';
import API from '../api';
import toast from 'react-hot-toast';
import Loader from './Loader';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Edit User state
    const [editingUserId, setEditingUserId] = useState(null);
    const [editUserData, setEditUserData] = useState({ name: '', role: '' });

    // Delete Modal state
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Trainer registration form state
    const [trainerData, setTrainerData] = useState({
        name: '', email: '', password: '', specialization: '', experience: '', bio: ''
    });
    const [isRegistering, setIsRegistering] = useState(false);

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

    const handleRegisterTrainer = async (e) => {
        e.preventDefault();
        setIsRegistering(true);
        try {
            await API.post('/admin/trainers', trainerData);
            toast.success('Trainer registered successfully!');
            setTrainerData({ name: '', email: '', password: '', specialization: '', experience: '', bio: '' });
            // Refresh stats to show new trainer count
            const statsRes = await API.get('/admin/stats');
            setStats(statsRes.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to register trainer');
        } finally {
            setIsRegistering(false);
        }
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    const confirmDeleteUser = async () => {
        if (!userToDelete) return;

        try {
            await API.delete(`/admin/users/${userToDelete._id}`);
            setUsers(users.filter(u => u._id !== userToDelete._id));
            toast.success('User deleted successfully');
            // Refresh stats
            const statsRes = await API.get('/admin/stats');
            setStats(statsRes.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete user');
        } finally {
            setDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    const handleEditFormSubmit = async (e, id) => {
        e.preventDefault();
        try {
            const { data } = await API.put(`/admin/users/${id}`, editUserData);
            setUsers(users.map(user => user._id === id ? data : user));
            setEditingUserId(null);
            toast.success('User updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update user');
        }
    };

    const startEditing = (user) => {
        setEditingUserId(user._id);
        setEditUserData({ name: user.name, role: user.role });
    };

    if (loading) return <Loader />;

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
                    <h3>Total Bookings</h3>
                    <p>{stats?.totalBookings}</p>
                </div>
                <div className="stat-card">
                    <h3>Workout Programs</h3>
                    <p>{stats?.totalPrograms}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p>ETB {stats?.totalRevenue}</p>
                </div>
            </div>

            <div className="contact-form-section" style={{ marginTop: '50px', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', background: 'linear-gradient(90deg, #fff 0%, #FF1414 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Register <span style={{ color: '#FF1414', WebkitTextStroke: '1px #FF1414', WebkitTextFillColor: 'transparent' }}>Trainer</span></h2>
                <form onSubmit={handleRegisterTrainer} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '800px', backgroundColor: '#050505', padding: '40px', borderRadius: '20px', border: '1px solid #1a1a1a', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)' }}>
                    <input type="text" placeholder="Full Name" required value={trainerData.name} onChange={e => setTrainerData({ ...trainerData, name: e.target.value })} />
                    <input type="email" placeholder="Email Address" required value={trainerData.email} onChange={e => setTrainerData({ ...trainerData, email: e.target.value })} />
                    <input type="password" placeholder="Password" required value={trainerData.password} onChange={e => setTrainerData({ ...trainerData, password: e.target.value })} />
                    <input type="text" placeholder="Specialization (comma separated)" value={trainerData.specialization} onChange={e => setTrainerData({ ...trainerData, specialization: e.target.value })} />
                    <input type="number" placeholder="Years of Experience" value={trainerData.experience} onChange={e => setTrainerData({ ...trainerData, experience: e.target.value })} />
                    <textarea placeholder="Bio" value={trainerData.bio} onChange={e => setTrainerData({ ...trainerData, bio: e.target.value })} style={{ gridColumn: '1 / -1', minHeight: '120px' }}></textarea>
                    <button type="submit" disabled={isRegistering} className="pr-btn" style={{ gridColumn: '1 / -1', width: '100%', border: 'none' }}>
                        {isRegistering ? 'Registering...' : 'Register Trainer'}
                    </button>
                </form>
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
                            {editingUserId === user._id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editUserData.name}
                                            onChange={e => setEditUserData({ ...editUserData, name: e.target.value })}
                                            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
                                        />
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select
                                            value={editUserData.role}
                                            onChange={e => setEditUserData({ ...editUserData, role: e.target.value })}
                                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                        >
                                            <option value="trainee">Trainee</option>
                                            <option value="trainer">Trainer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={(e) => handleEditFormSubmit(e, user._id)} className="action-btn btn-approve" style={{ marginRight: '5px' }}>Save</button>
                                        <button onClick={() => setEditingUserId(null)} className="action-btn">Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => startEditing(user)} className="action-btn btn-approve" style={{ marginRight: '5px' }}>Edit</button>
                                        <button onClick={() => handleDeleteClick(user)} className="action-btn btn-reject">Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {deleteModalOpen && userToDelete && (
                <div className='modal-overlay'>
                    <div className='modal-content' style={{ maxWidth: '400px', textAlign: 'center' }}>
                        <span className='modal-close' onClick={() => setDeleteModalOpen(false)}>&times;</span>
                        <h2 style={{ color: '#FF1414', fontSize: '2rem', marginBottom: '10px' }}>Warning</h2>
                        <p style={{ color: '#ccc', marginBottom: '30px', fontSize: '1.1rem' }}>
                            Are you sure you want to delete <strong>{userToDelete.name}</strong>? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button onClick={confirmDeleteUser} className='modal-btn' style={{ backgroundColor: '#FF1414', border: '1px solid #FF1414', flex: 1 }}>DELETE</button>
                            <button onClick={() => setDeleteModalOpen(false)} className='modal-btn' style={{ backgroundColor: '#111', color: '#fff', border: '1px solid #333', flex: 1 }}>CANCEL</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
