const Admin = `#graphql
    type Query {
        get_all_users: [User!]!
        get_all_bookings: [Booking!]!
    }
    type Mutation {
        create_user(
            name: String!
            email: String!
            password: String!
            phone: String!
            role: String
        ): User!
        delete_user(id: ID!): Boolean!
        update_user(
            id: ID!
            name: String
            email: String
            phone: String
            role: String
            is_active: Boolean
            is_verified: Boolean
        ): User!
        delete_booking(id: ID!): Boolean!
    }
`

module.exports = Admin