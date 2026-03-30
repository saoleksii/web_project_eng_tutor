import { gql } from '@apollo/client'

// Auth

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user { _id name role }
        }
    }
`

export const REGISTER = gql`
    mutation Register(
        $name: String!, $email: String!, $password: String!,
        $phone: String!, $role: String
    ) {
        register(name: $name, email: $email, password: $password,
                 phone: $phone, role: $role)
    }
`

// User

export const GET_ME = gql`
    query {
        get_user {
            _id name email phone role photo
            experience description price education is_active
        }
    }
`

export const UPDATE_ME = gql`
    mutation UpdateMe(
        $name: String, $phone: String, $photo: String,
        $description: String, $price: Int,
        $education: String, $experience: String
    ) {
        update_me(name: $name, phone: $phone, photo: $photo,
                  description: $description, price: $price,
                  education: $education, experience: $experience) {
            _id name email phone role photo
            experience description price education is_active
        }
    }
`

// Tutors

export const GET_TUTORS = gql`
    query {
        get_tutors {
            _id name experience description price education photo
        }
    }
`

// Bookings

export const GET_BOOKINGS = gql`
    query {
        get_bookings {
            _id date time status meeting_link
            student_id { _id name }
            tutor_id { _id name }
        }
    }
`

export const ADD_BOOKING = gql`
    mutation AddBooking($tutor_id: ID!, $date: String!, $time: String!) {
        add_booking(tutor_id: $tutor_id, date: $date, time: $time) {
            _id date time status meeting_link
            student_id { _id name }
            tutor_id { _id name }
        }
    }
`

export const UPDATE_BOOKING_STATUS = gql`
    mutation UpdateBookingStatus($id: ID!, $status: BookingStatus!, $meeting_link: String!) {
        update_booking_status(id: $id, status: $status, meeting_link: $meeting_link) {
            _id date time status meeting_link
            student_id { _id name }
            tutor_id { _id name }
        }
    }
`

// Admin

export const GET_ALL_USERS = gql`
    query {
        get_all_users {
            _id name email phone role is_active is_verified
            photo experience description price education
        }
    }
`

export const GET_ALL_BOOKINGS = gql`
    query {
        get_all_bookings {
            _id date time status meeting_link
            student_id { _id name }
            tutor_id { _id name }
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser(
        $name: String!, $email: String!, $password: String!,
        $phone: String!, $role: String
    ) {
        create_user(name: $name, email: $email, password: $password,
                    phone: $phone, role: $role) {
            _id name email role
        }
    }
`

export const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: ID!, $name: String, $email: String, $phone: String,
        $role: String, $is_active: Boolean, $is_verified: Boolean
    ) {
        update_user(id: $id, name: $name, email: $email, phone: $phone,
                    role: $role, is_active: $is_active, is_verified: $is_verified) {
            _id name email role is_active is_verified
        }
    }
`

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        delete_user(id: $id)
    }
`

export const DELETE_BOOKING = gql`
    mutation DeleteBooking($id: ID!) {
        delete_booking(id: $id)
    }
`