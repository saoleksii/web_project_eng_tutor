import client from './apolloClient'
import {
    LOGIN, REGISTER,
    GET_ME, UPDATE_ME,
    GET_TUTORS,
    GET_BOOKINGS, ADD_BOOKING, UPDATE_BOOKING_STATUS,
    GET_ALL_USERS, GET_ALL_BOOKINGS,
    CREATE_USER, UPDATE_USER, DELETE_USER, DELETE_BOOKING
} from './operations'

// Auth

export const login = async (email, password) => {
    const { data } = await client.mutate({
        mutation: LOGIN,
        variables: { email, password: String(password) }
    })
    const { token, user } = data.login
    return { token, user: { ...user, id: user._id } }
}

export const register = async (formData) => {
    const { data } = await client.mutate({
        mutation: REGISTER,
        variables: formData
    })
    return data.register
}

// User

export const getProfile = async () => {
    const { data } = await client.query({
        query: GET_ME,
        fetchPolicy: 'network-only'
    })
    return data.get_user
}

export const updateProfile = async (formData) => {
    const { email, ...fields } = formData
    const { data } = await client.mutate({
        mutation: UPDATE_ME,
        variables: fields
    })
    return data.update_me
}

// Tutors

export const getTutors = async () => {
    const { data } = await client.query({ query: GET_TUTORS })
    return data.get_tutors
}

// Bookings

export const getBookings = async () => {
    const { data } = await client.query({
        query: GET_BOOKINGS,
        fetchPolicy: 'network-only'
    })
    return data.get_bookings
}

export const createBooking = async ({ tutor_id, date, time }) => {
    const { data } = await client.mutate({
        mutation: ADD_BOOKING,
        variables: { tutor_id, date, time }
    })
    return data.add_booking
}

export const updateBooking = async (id, { status, meeting_link }) => {
    const { data } = await client.mutate({
        mutation: UPDATE_BOOKING_STATUS,
        variables: { id, status, meeting_link: meeting_link || "" }
    })
    return data.update_booking_status
}

// Admin

export const adminGetAllUsers = async () => {
    const { data } = await client.query({
        query: GET_ALL_USERS,
        fetchPolicy: 'network-only'
    })
    return data.get_all_users
}

export const adminGetAllBookings = async () => {
    const { data } = await client.query({
        query: GET_ALL_BOOKINGS,
        fetchPolicy: 'network-only'
    })
    return data.get_all_bookings
}

export const adminCreateUser = async (userData) => {
    const { data } = await client.mutate({
        mutation: CREATE_USER,
        variables: userData
    })
    return data.create_user
}

export const adminUpdateUser = async (id, updates) => {
    const { data } = await client.mutate({
        mutation: UPDATE_USER,
        variables: { id, ...updates }
    })
    return data.update_user
}

export const adminDeleteUser = async (id) => {
    await client.mutate({ mutation: DELETE_USER, variables: { id } })
}

export const adminDeleteBooking = async (id) => {
    await client.mutate({ mutation: DELETE_BOOKING, variables: { id } })
}