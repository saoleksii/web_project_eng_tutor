export const User = ` #graphql
    enum Role {
        student
        tutor
        admin
    }
    type User {
        _id: ID!
        name: String!
        email: String!
        phone: String!
        role: Role!
        is_verified: Boolean!
        is_active: Boolean!
        photo: String!
        experience: String!
        description: String!
        price: Int!
        education: String!
    }
    type Auth {
        token: String!
        user: User!
    }
    type Query {
        get_tutors
        get_user

    }
`