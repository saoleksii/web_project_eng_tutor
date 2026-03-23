import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        description: '',
        price: '',
        education: '',
        experience: '',
        photo: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/user');
                setFormData(res.data)
            } catch (err) {
                console.error("Loading error:", err);
                setError('Failed to load profile.');
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0]
        const uploadData = new FormData()
        uploadData.append('photo', file)
        try {
            const res = await api.post('/upload', uploadData, {headers: { 'Content-Type': 'multipart/form-data' }})
            setFormData({ ...formData, photo: res.data.photo_url })
            alert("Photo saved!")
        } catch (err) {
            console.error("Upload error", err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await api.patch('/user', formData);
            setSuccess('Profile updated!');
            
            const storedUser = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({ ...storedUser, name: formData.name }));
        } catch (err) {
            setError(err.response?.data?.message || 'Update error');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-dark text-white p-3 d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">My account</h4>
                            <span className="badge bg-primary text-uppercase">{formData.role}</span>
                        </div>
                        <div className="card-body p-4">
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-4 text-center">
                                        <img 
                                            src={formData.photo || `https://ui-avatars.com/api/?name=${formData.name}`} 
                                            alt="Avatar"
                                            className="img-thumbnail rounded-circle mb-3 shadow-sm"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover', border: '3px solid #f8f9fa' }}
                                            onError={(e) => { e.target.src = 'https://www.w3schools.com/howto/img_avatar.png' }}
                                        />
                                        <input type="file" className="form-control form-control-sm" onChange={handlePhotoChange}/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Full name</label>
                                            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Email</label>
                                            <input type="email" className="form-control bg-light" value={formData.email} disabled />
                                            <small className="text-muted">Email can't be changed</small>
                                        </div>
                                    </div>
                                </div>

                                {formData.role === 'tutor' && (
                                    <div className="p-3 bg-light rounded border mb-4">
                                        <h5 className="text-primary mb-3">Tutor data</h5>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Price per H</label>
                                                <input type="number" name="price" className="form-control" value={formData.price || ''} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Experience</label>
                                                <input type="text" name="experience" className="form-control" value={formData.experience || ''} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Education</label>
                                            <input type="text" name="education" className="form-control" value={formData.education || ''} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea name="description" className="form-control" rows="3" value={formData.description || ''} onChange={handleChange}></textarea>
                                        </div>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="button" className="btn btn-link text-decoration-none" onClick={() => navigate('/')}>To main page</button>
                                    <button type="submit" className="btn btn-primary px-5 fw-bold shadow-sm">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;