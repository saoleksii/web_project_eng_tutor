import { useState, useEffect } from 'react'
import api from '../api/axios'
import CreateUserForm from '../components/CreateUserForm'

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users')
    const [users, setUsers] = useState([])
    const [bookings, setBookings] = useState([])
    const [error, setError] = useState('')
    const [editingUser, setEditingUser] = useState(null)
    const [isCreatingUser, setIsCreatingUser] = useState(false)

    useEffect(() => {
        if (activeTab === 'users') loadUsers()
        if (activeTab === 'bookings') loadBookings()
    }, [activeTab])
    const loadUsers = async () => {
        try {
            const res = await api.get('/admin/users')
            setUsers(res.data)
        } catch (err) {
            setError('Failed to load users')
        }
    }
    const loadBookings = async () => {
        try {
            const res = await api.get('/admin/bookings')
            setBookings(res.data)
        } catch (err) {
            setError('Failed to load bookings')
        }
    }
    const handleUserCreated = (newUserData) => {
        setUsers(prev => [newUserData, ...prev])
        setIsCreatingUser(false)
    }
    const handleDeleteUser = async (id) => {
        if (!window.confirm('Delete this user?')) return
        try {
            await api.delete(`/admin/users/${id}`)
            setUsers(prev => prev.filter(u => u._id !== id))
        } catch (err) {
            setError('Failed to delete user')
        }
    }

    const handleDeleteBooking = async (id) => {
        if (!window.confirm('Delete this booking?')) return
        try {
            await api.delete(`/admin/bookings/${id}`)
            setBookings(prev => prev.filter(b => b._id !== id))
        } catch (err) {
            setError('Failed to delete booking')
        }
    }

    const handleEditUser = (user) => {
        setEditingUser({ ...user })
    }

    const handleUpdateUser = async () => {
        try {
            const res = await api.patch(`/admin/users/${editingUser._id}`, {
                name: editingUser.name,
                email: editingUser.email,
                role: editingUser.role,
                is_active: editingUser.is_active,
                is_verified: editingUser.is_verified
            })
            setUsers(prev => prev.map(u => u._id === editingUser._id ? res.data : u))
            setEditingUser(null)
        } catch (err) {
            setError('Failed to update user')
        }
    }

    const getStatusBadge = (status) => {
        const map = { pending: 'warning', confirmed: 'success', cancelled: 'danger', finished: 'success' }
        return <span className={`badge bg-${map[status]}`}>{status}</span>
    }

    return (
        <div className="container mt-5">
            <h4 className="fw-bold mb-4">Admin Panel</h4>
            {error && <div className="alert alert-danger">{error}</div>}

            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}>
                        Users
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookings')}>
                        Bookings
                    </button>
                </li>
            </ul>

            {activeTab === 'users' && (
                <div>
                    
                    {editingUser && (
                        <div className="card mb-4 border shadow-sm">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">Edit User</h5>
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editingUser.name}
                                            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={editingUser.email || ''}
                                            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">Role</label>
                                        <select
                                            className="form-select"
                                            value={editingUser.role}
                                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
                                            <option value="student">Student</option>
                                            <option value="tutor">Tutor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">Active</label>
                                        <select
                                            className="form-select"
                                            value={editingUser.is_active}
                                            onChange={(e) => setEditingUser({ ...editingUser, is_active: e.target.value === 'true' })}>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">Verified</label>
                                        <select
                                            className="form-select"
                                            value={editingUser.is_verified}
                                            onChange={(e) => setEditingUser({ ...editingUser, is_verified: e.target.value === 'true' })}>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-3 d-flex gap-2">
                                    <button className="btn btn-primary" onClick={handleUpdateUser}>Save</button>
                                    <button className="btn btn-outline-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <table className="table shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Active</th>
                                <th>Verified</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><span className="badge bg-primary">{user.role}</span></td>
                                    <td>{user.is_active ? '✅' : '❌'}</td>
                                    <td>{user.is_verified ? '✅' : '❌'}</td>
                                    <td className="d-flex gap-2">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleEditUser(user)}>
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteUser(user._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mb-3 d-flex justify-content-end">
                <button 
                    className="btn btn-success" 
                    onClick={() => {
                        setIsCreatingUser(true)
                        setEditingUser(null) 
                    }}>
                    + Add New User
                </button>
            </div>
            {isCreatingUser && (
                <CreateUserForm 
                    onSuccess={handleUserCreated} 
                    onCancel={() => setIsCreatingUser(false)} 
                />
            )}
            
            {/* bookings */}
            {activeTab === 'bookings' && (
                <table className="table shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>Student</th>
                            <th>Tutor</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking.student_id?.name}</td>
                                <td>{booking.tutor_id?.name}</td>
                                <td>{booking.date}</td>
                                <td>{booking.time}</td>
                                <td>{getStatusBadge(booking.status)}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteBooking(booking._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminPanel