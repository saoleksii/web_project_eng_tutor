import { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

const TutorCard = ({ tutor }) => {
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [bookingData, setBookingData] = useState({ date: '', time: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleBooking = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }

        try {
            await api.post('/bookings', {
                tutor_id: tutor._id,
                date: bookingData.date,
                time: bookingData.time
            })
            setSuccess('Lesson booked successfully!')
            setBookingData({ date: '', time: '' })
            setShowForm(false)
        } catch (err) {
            setError(err.response?.data?.message || 'Booking error')
        }
    }
    const formatDescription = (text) => {
        if (text.length <= 80 || isExpanded) return text
        return text.substring(0, 140) + "..."
    }
    return (
        <div className="card shadow-sm mb-4 w-100">
            <div className="row g-0">
                <div className="col-md-3 p-3">
                    <img
                        src={tutor.photo || `https://ui-avatars.com/api/?name=${tutor.name}`}
                        alt={tutor.name} 
                        className="img-fluid rounded border"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                </div>
                
                <div className="col-md-9">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                            <p className="card-title text-primary fw-bold mb-0 fs-4">{tutor.name}</p>
                            <span className="badge bg-success fs-6">{tutor.price} UAH/H</span>
                        </div>
                        
                        <div className="mb-2">
                            <small className="text-muted fw-bold fs-6">Education:</small>
                            <p className="card-text mb-2 text-dark fs-6" style={{ fontSize: '0.9rem' }}>
                                {tutor.education || 'Not specified'}
                            </p>
                        </div>

                        <div className="mb-2">
                            <small className="text-muted fw-bold fs-6">Experience:</small>
                            <p className="card-text mb-2 text-dark fs-6" style={{ fontSize: '0.9rem' }}>
                                {tutor.experience || 'Not specified'}
                            </p>
                        </div>
                    </div> 
                </div>
                <div className="px-3">
                    <div style={{maxWidth: '80%'}}>
                    <small className="text-muted fw-bold fs-6">About me:</small>
                        <p className="card-text text-secondary fs-6">
                            {formatDescription(tutor.description)}
                            {tutor.description?.length > 140 && (
                                <button 
                                    className="btn btn-link btn-sm p-0 ms-1 text-decoration-none" 
                                    onClick={() => setIsExpanded(!isExpanded)}>
                                    {isExpanded ? 'Show less' : 'Read more'}
                                </button>
                            )}
                        </p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3">
                    <button onClick={() => setShowForm(!showForm)} className="btn btn-primary px-4 shadow-sm fw-bold">Book a lesson</button>
                </div>
                {success && <div className="alert alert-success py-2">{success}</div>}

                {showForm && (
                    <div className="p-3 border-top bg-light">
                        {error && <div className="alert alert-danger py-2">{error}</div>}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0 text-dark fw-bold">Please select time</h5>
                                <button
                                    type="button" 
                                    className="btn-close shadow-none"
                                    aria-label="Close"
                                    onClick={() => setShowForm(false)}
                                />
                        </div>
                        <form onSubmit={handleBooking}>
                            <div className="mb-3">
                            <label className="form-label">Select Date</label>
                            <input type="date" className="form-control" required 
                                value={bookingData.date}
                                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Select Time</label>
                                <input type="time" className="form-control" required 
                                    value={bookingData.time}
                                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Confirm Booking</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TutorCard