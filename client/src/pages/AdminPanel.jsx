import React, { useState, useEffect } from 'react'
import api from '../api/axios'

function AdminPanel() {
    const [users, setUsers] = useState([])

    const loadUsers = async () => {
        const response = await api.get('/admin/users')
        setUsers(response.data)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            loadUsers()
        } else {
            console.log("No token")
        }
    }, [])

    const handleToggle = async (id) => {
        await api.patch(`/admin/users/${id}/toggle`)
        loadUsers() 
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Admin panel</h2>
            <table className="table shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.isActive ? 'Active' : 'Not active'}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleToggle(user._id)}>
                                    Change status
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPanel