const user_model = require('../models/User')
const booking_model = require('../models/Booking')
const bcrypt = require('bcryptjs')

exports.create_user = async (req, res) => {
    try{
        const { name, email, password, phone, role } = req.body
        const hash_pass = await bcrypt.hash(password, 10)

        const new_user = new user_model({
            name, email, password: hash_pass, 
            phone, role, is_verified: true
        })

        await new_user.save()
        res.status(201).json({ message: "User created by admim", user: new_user})
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.get_all_users = async (req, res) => {
    try{
        const users = await user_model.find().select('-password')
        res.status(200).json(users)
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

exports.get_one_user = async (req, res) => {
    try{
        const user_id = req.params.id
        const user = await user_model.findById(user_id).select('-password')
        if(!user) return res.status(404).json({message: "User not found"})
        res.status(200).json({id: user_id, user: user})
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

exports.delete_user = async (req, res) => {
    try{
        const user_id = req.params.id
        const deleted_user = await user_model.findByIdAndDelete(user_id)
        if(!deleted_user) return res.status(404).json({message: "User not found"})
        res.status(200).json({message: "User deleted"})
    }
    catch (error){
        res.status(500).json({error: error.message})
    }
}

exports.update_user = async (req, res) => {
    try{
        const id = req.params.id
        const updates = req.body
        if(updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10)
        }

        const updated_user = await user_model.findByIdAndUpdate(id, updates, {new: true}).select('-password')
        if(!updated_user) return res.status(404).json({message: "User not found"})
        res.status(200).json(updated_user)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

exports.get_all_bookings = async (req, res) => {
    try {
        const bookings = await booking_model.find()
            .populate('student_id', 'name email')
            .populate('tutor_id', 'name email')
        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.delete_booking = async (req, res) => {
    try {
        const deleted = await booking_model.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ message: "Booking not found" })
        res.status(200).json({ message: "Booking deleted" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}