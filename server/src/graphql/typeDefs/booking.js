const Booking = `#graphql
    enum BookingStatus {
        pending
        confirmed
        cancelled
        finished
    }
    type Booking {
        _id: ID!
        student_id: User!
        tutor_id: User!
        date: String!
        time: String!
        status: BookingStatus!
        meeting_link: String!
    }
    type Query {
        get_bookings: [Booking!]!
    }
    type Mutation {
        add_booking(tutor_id: ID!, date: String!, time: String!): Booking!
        update_booking_status(id: ID!, status: BookingStatus!, meeting_link: String): Booking!
    }
`

module.exports = Booking