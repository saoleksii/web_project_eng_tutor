import React, { useState, useEffect } from 'react'
import api from '../api/axios'

const MyBookings = () => {
    const [bookings, setBookings] = useState([])
    const [error, setError] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))
    const [meetingLinks, setMeetingLinks] = useState({})

    useEffect(() => {
        fetchBookings()
    }, [])

    const fetchBookings = async () => {
        try {
            const res = await api.get('/bookings')
            setBookings(res.data)
        } catch (err) {
            setError('Failed to load bookings.')
        }
    }

    const handleUpdateStatus = async (id, status) => {
        try {
            const res = await api.patch(`/bookings/${id}`, { 
                status,
                meeting_link: meetingLinks[id] || ''
            })
            setBookings(prev => prev.map(b =>
                b._id === id ? res.data : b
            ))
        } catch (err) {
            setError(err.response?.data?.message || 'Update error')
        }
    }

    const getStatusBadge = (status) => {
        const map = {
            pending: 'warning',
            confirmed: 'success',
            cancelled: 'danger'
        }
        return <span className={`badge bg-${map[status]}`}>{status}</span>
    }

    return (
        <div className='w-50 mx-auto'>
            {error && <div className="alert alert-danger">{error}</div>}
            {bookings.length === 0 ? (
                <h4 className="text-muted text-center mt-3">No bookings yet</h4>
            ) : (
                bookings.map(booking => (
                    <div key={booking._id} className="card mb-3 border shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                {user?.role === 'student' ? (
                                    <h6 className="fw-bold mb-0">Tutor: {booking.tutor_id?.name}</h6>
                                ) : (
                                    <h6 className="fw-bold mb-0">Student: {booking.student_id?.name}</h6>
                                )}
                                {getStatusBadge(booking.status)}
                            </div>

                            <p className="mb-1 text-muted">Date: {booking.date}</p>
                            <p className="mb-1 text-muted">Time: {booking.time}</p>

                            {booking.meeting_link && booking.status === 'confirmed' && (
                                <a
                                    href={booking.meeting_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-sm btn-outline-success mt-2 me-2">
                                    Join lesson
                                </a>
                            )}

                            {user?.role === 'tutor' && booking.status === 'pending' && (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        className="form-control form-control-sm mb-2"
                                        placeholder="Meeting link (Google Meet, Zoom...)"
                                        value={meetingLinks[booking._id] || ''}
                                        onChange={(e) => setMeetingLinks(prev => ({
                                            ...prev,
                                            [booking._id]: e.target.value
                                        }))}
                                    />
                                    <button
                                        className="btn btn-sm btn-success me-2"
                                        onClick={() => handleUpdateStatus(booking._id, 'confirmed')}>
                                        Confirm
                                    </button>
                                </div>
                            )}

                            {booking.status !== 'cancelled' && (
                                <button
                                    className="btn btn-sm btn-outline-danger mt-2"
                                    onClick={() => handleUpdateStatus(booking._id, 'cancelled')}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default MyBookings