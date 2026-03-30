import { useState } from 'react'
import { useApi } from '../App'

const CreateUserForm = ({ onSuccess, onCancel }) => {
    const { adminCreateUser } = useApi()
    const [newUser, setNewUser] = useState({
        name: '', email: '', password: '', phone: '', role: 'student'
    })
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        try {
            const user = await adminCreateUser(newUser)
            onSuccess(user)
            alert("New user created!")
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create user')
        }
    }

    return (
        <div className="card mb-4 border shadow-sm">
            <div className="card-body">
                <h5 className="fw-bold mb-3">Create New User</h5>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-2">
                            <label className="form-label">Name</label>
                            <input required type="text" className="form-control" value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Email</label>
                            <input required type="email" className="form-control" value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Password</label>
                            <input required type="password" className="form-control" value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Phone</label>
                            <input required type="text" className="form-control" value={newUser.phone}
                                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                                <option value="student">Student</option>
                                <option value="tutor">Tutor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3 d-flex gap-2">
                        <button type="submit" className="btn btn-success">Create</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUserForm