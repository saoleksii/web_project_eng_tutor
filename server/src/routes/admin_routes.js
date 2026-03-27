const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/admin_controller')
const is_admin = require('../middleware/auth_mw')

router.use(is_admin)

router.post('/users', auth_controller.create_user)
router.get('/users', auth_controller.get_all_users)
router.delete('/users/:id', auth_controller.delete_user)
router.patch('/users/:id', auth_controller.update_user)
router.get('/bookings', auth_controller.get_all_bookings)
router.delete('/bookings/:id', auth_controller.delete_booking)

module.exports = router