const User = ` #graphql
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
        photo: String
        experience: String
        description: String
        price: Int
        education: String   
    }
    type Auth {
        token: String!
        user: User!
    }
    type Query {
        get_tutors: [User!]!
        get_user: User!
    }
    type Mutation {
        update_me(
            name: String
            phone: String
            description: String
            photo: String
            experience: String
            price: Int
            education: String
        ): User!
        register(
            name: String!
            email: String!
            phone: String!
            password: String!
            role: String
        ): String!
        login(
            email: String!
            password: String!
        ): Auth!
    }
`

module.exports = User