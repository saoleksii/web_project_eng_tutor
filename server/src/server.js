const express = require('express')
const path = require('path')
const port = process.env.PORT
const connectDB = require('./config/db')
const logger = require('./middleware/logger')
const not_found = require('./middleware/not_found')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '..', 'client')))
app.use(logger)
const user_routes = require('./routes/auth_routes')
const admin_routes = require('./routes/admin_routes')
app.use('/api/auth', user_routes)
app.use('/api/admin', admin_routes)
app.use(not_found)
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error"
        }
    })
})

app.listen(port, () => console.log(`Server is running on port ${port}`))