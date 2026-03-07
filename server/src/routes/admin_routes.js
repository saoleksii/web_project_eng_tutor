const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/admin_controller')

router.post('/users', auth_controller.create_user)
router.get('/users', auth_controller.get_all_users)
router.get('/users/:id', auth_controller.get_one_user)
router.delete('/users/:id', auth_controller.delete_user)
router.patch('/users/:id', auth_controller.update_user)

module.exports = router