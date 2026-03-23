const booking_model = require('../models/Booking')
const user_model = require('../models/User')

exports.get_bookings = async (req, res) => {
    try{
        const { id, role } = req.user
        const filter = role == 'student' 
            ? { student: id } 
            : { tutor: id }
        const bookings = await booking_model
            .find(filter)
            .populate('student', 'name email phone')
            .populate('tutor', 'name email phone')
        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message })
    }
}

exports.add_booking = async (req, res) => {
    try{
        const {tutor_id, date, time} = req.body
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: "Only students can book lessons" })
        }
        const tutor = await user_model.findById(tutor_id)
        if (!tutor) {
            return res.status(404).json({ message: "Tutor not found" })
        }
        const new_booking = new booking_model({
            student_id: req.user.id,
            tutor_id,
            date,
            time,
            meeting_link: tutor.meeting_link
        })
        await new_booking.save()
        res.status(201).json(new_booking)
    } catch(error){
        res.status(500).json({ message: "Booking error", error: error.message })
    }
}

exports.update_booking_status = async(req, res) => {
    try{
        const id = req.params.id
        const status = req.body.status
        const booking = await booking_model.findById(id)
        if (!booking) return res.status(404).json({ message: "Booking not found" })
        if (status == 'confirmed' && req.user.role !== 'tutor') {
            return res.status(403).json({ message: "Only tutor can confirm a booking" })
        }
        const is_own_booking = 
            booking.student_id.toString() === req.user.id ||
            booking.tutor_id.toString() === req.user.id
        if (!is_own_booking) {
            return res.status(403).json({ message: "Not your booking" })
        }
        booking.status = status
        await booking.save()
        res.status(200).json({status:booking.status})

    } catch(error){
        res.status(500).json({ message: "Update booking status error", error: error.message })
    }
}