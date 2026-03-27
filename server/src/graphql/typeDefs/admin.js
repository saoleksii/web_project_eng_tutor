export const Admin = `#graphql
    type Query {
        get_all_users: [User!]!
        get_one_user(id: ID!): User!
        get_all_bookings: [Booking!]!
    }
    type Mutation {
        create_user: User!
        delete_user(id: ID!): Boolean!
        update_user: User!
        delete_booking(id: ID!): Boolean!
    }
`