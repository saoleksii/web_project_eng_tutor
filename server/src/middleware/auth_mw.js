const user_model = require("../models/User")

const is_admin = async (req, res, next) => {
    try{
        const admin_id = req.headers['admin-id']
        if (!admin_id) {
            return res.status(401).json({ message: "No admin ID provided" })
        }

        const user = await user_model.findById(admin_id)

        if (user && user.role === 'admin') {
            next()
        } else {
            res.status(403).json({ message: "Access denied: admins only" })
        }
    }
    catch(error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = is_admin