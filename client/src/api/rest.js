import client from './axios'

// Auth

export const login = async (email, password) => {
    const res = await client.post('/auth/login', { email, password })
    return res.data
}

export const register = async (formData) => {
    const res = await client.post('/auth/register', formData)
    return res.data
}

// User

export const getProfile = async () => {
    const res = await client.get('/user')
    return res.data
}

export const updateProfile = async (formData) => {
    const res = await client.patch('/user', formData)
    return res.data
}

// Tutors

export const getTutors = async () => {
    const res = await client.get('/tutors')
    return res.data
}

// Bookings

export const getBookings = async () => {
    const res = await client.get('/bookings')
    return res.data
}

export const createBooking = async ({ tutor_id, date, time }) => {
    const res = await client.post('/bookings', { tutor_id, date, time })
    return res.data
}

export const updateBooking = async (id, { status, meeting_link }) => {
    const res = await client.patch(`/bookings/${id}`, { status, meeting_link })
    return res.data
}

// Admin

export const adminGetAllUsers = async () => {
    const res = await client.get('/admin/users')
    return res.data
}

export const adminGetAllBookings = async () => {
    const res = await client.get('/admin/bookings')
    return res.data
}

export const adminCreateUser = async (userData) => {
    const res = await client.post('/admin/users', userData)
    return res.data.user
}

export const adminUpdateUser = async (id, updates) => {
    const res = await client.patch(`/admin/users/${id}`, updates)
    return res.data
}

export const adminDeleteUser = async (id) => {
    await client.delete(`/admin/users/${id}`)
}

export const adminDeleteBooking = async (id) => {
    await client.delete(`/admin/bookings/${id}`)
}