const jwt = require('jsonwebtoken')
const jwt_key = process.env.JWT_SECRET

const is_admin = async (req, res, next) => {
    const auth_header = req.headers.authorization
    const token = auth_header && auth_header.split(' ')[1]

    if (!token) return res.status(401).json({ message: "Access denied: No token provided" })

    try {
        const decoded = jwt.verify(token, jwt_key)
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Access denied: admins only" })
        }

        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" })
    }
}

module.exports = is_admin