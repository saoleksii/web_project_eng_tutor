const express = require('express')
const router = express.Router()
const booking_controller = require('../controllers/booking_controller')
const verify_token = require('../middleware/verify_token')

router.get('/', verify_token, booking_controller.get_bookings)
router.post('/', verify_token, booking_controller.add_booking)
router.patch('/:id', verify_token, booking_controller.update_booking_status)

module.exports = router