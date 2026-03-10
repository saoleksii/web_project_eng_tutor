const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/user_controller')
const verify_token = require('../middleware/verify_token')

router.get('/tutors', user_controller.get_tutors)
router.get('/user', verify_token, user_controller.get_user)
router.patch('/user', verify_token, user_controller.update_user)

module.exports = router