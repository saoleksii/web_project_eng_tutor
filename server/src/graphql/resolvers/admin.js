const user_model = require('../../models/User')
const booking_model = require('../../models/Booking')
const bcrypt = require('bcryptjs')
const { GraphQLError } = require('graphql')

const admin_resolvers = {
    Query: {
        get_all_users: async(parent, args, context) => {
            if (!context.user || context.user.role !== 'admin') throw new GraphQLError("No access", { extensions: { code: 'FORBIDDEN' }})
            return await user_model.find().select('-password')
        },
        get_all_bookings: async(parent, args, context) => {
            if (!context.user || context.user.role !== 'admin') throw new GraphQLError("No access", { extensions: { code: 'FORBIDDEN' }})
            return await booking_model.find()
        }
    },
    Mutation: {
        create_user: async(parent, args, context) => {
            if (!context.user || context.user.role !== 'admin') throw new GraphQLError("No access", { extensions: { code: 'FORBIDDEN' }})
            const hash_pass = await bcrypt.hash(args.password, 10)
            const new_user = new user_model({...args, password: hash_pass, is_verified: args.role == "student"})
            return await new_user.save()
        },
        delete_user: async(parent, {id}, context) => {
            if (!context.user || context.user.role !== 'admin') throw new GraphQLError("No access", { extensions: { code: 'FORBIDDEN' }})
            const user = await user_model.findByIdAndDelete(id)
            if(!user) throw new Error('User not found')
            return true
        },
        update_user: async(parent, args, contect) => {
            if (!context.user || context.user.role !== 'admin') throw new GraphQLError("No access", { extensions: { code: 'FORBIDDEN' }})
            const { id, ...updates } = args
            const user = await user_model.findByIdAndUpdate(id, updates, {new: true})
            if(!user) throw new Error('User not found')
            return user
        },
        delete_booking: async(parent, { id }, context) => {
            if (!context.user || context.user.role !== 'admin') throw new GraphQLError("No access", { extensions: { code: 'FORBIDDEN' }})
            const booking = await user_model.findByIdAndDelete(id)
            if(!booking) throw new Error('Booking not found')
            return true
        }
    }
}

module.exports = admin_resolvers