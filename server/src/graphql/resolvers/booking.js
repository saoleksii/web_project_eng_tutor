const booking_model = require('../../models/Booking')
const { GraphQLError } = require('graphql')

const booking_resolver = {
    Query: {
        get_bookings: async (parent, args, context) => {
            if(!context.user) throw new GraphQLError("Log in first", { extensions: { code: 'UNAUTHENTICATED' }})
            return await booking_model.find({
                $or: [{ student_id: context.user.id }, { tutor_id: context.user.id }]
            })
            .populate('student_id')
            .populate('tutor_id')
        }
    },
    Mutation: {
        add_booking: async (parent, { tutor_id, date, time }, context) => {
            if(!context.user) throw new GraphQLError("Log in first", { extensions: { code: 'UNAUTHENTICATED' }})
            if(context.user.role != 'student') throw new GraphQLError("Only students can book lessons", { extensions: { code: 'FORBIDDEN' }})
            const new_booking = new booking_model({
                student_id: context.user.id,
                tutor_id,
                date,
                time
            })
            await new_booking.save()
            return new_booking.populate('student_id tutor_id')
        },
        update_booking_status: async (parent, { id, status, meeting_link }, context) => {
            if(!context.user) throw new GraphQLError("Log in first", { extensions: { code: 'UNAUTHENTICATED' }})
            const booking = await booking_model.findByIdAndUpdate(
                id, { status, meeting_link }, { new: true }
            )
            .populate('student_id')
            .populate('tutor_id')
            if(!booking) throw new Error("Booking not found")
            return booking
        }
    }
}

module.exports = booking_resolver