const mongoose = require('mongoose')

const booking_schema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    tutor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'finished'],
        default: 'pending'
    },
    meeting_link: { type: String, default: '' }
}, {
    timestamps: true
})

module.exports = mongoose.model('booking', booking_schema)