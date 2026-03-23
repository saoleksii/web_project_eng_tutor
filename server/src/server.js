const express = require('express')
const mongo_sanitize = require('express-mongo-sanitize')
const path = require('path')
const helmet = require('helmet')
const port = process.env.PORT
const client_url = process.env.CLIENT_URL
const connectDB = require('./config/db')
const logger = require('./middleware/logger')
const not_found = require('./middleware/not_found')
const cors = require('cors')

const app = express()
app.use(cors({
    origin: client_url,
    credentials: true
}))
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use((req, res, next) => {
    if (req.body) {
        req.body = mongo_sanitize.sanitize(req.body)
    }
    next()
})
app.use(express.static(path.join(__dirname, '..', '..', 'client')))
app.use(logger)
const auth_routes = require('./routes/auth_routes')
const admin_routes = require('./routes/admin_routes')
const user_routes = require('./routes/user_routes')
const upload_routes = require('./routes/upload')

app.use('/api/auth', auth_routes)
app.use('/api/admin', admin_routes)
app.use('/api', user_routes)
app.use('/api', upload_routes);
app.use(not_found)
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error"
        }
    })
})

app.listen(port, () => console.log(`Server is running on port ${port}`))