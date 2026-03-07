const express = require('express')
const path = require('path')
const port = process.env.PORT
const connectDB = require('./config/db')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '..', 'client')))
const user_routes = require('./routes/auth_routes');
app.use('/api/auth', user_routes);

app.listen(port, () => console.log(`Server is running on port ${port}`))