const connectDB = require('./config/db')
const express = require('express')
const mongo_sanitize = require('express-mongo-sanitize')
const path = require('path')
const helmet = require('helmet')
const port = process.env.PORT
const client_url = process.env.CLIENT_URL
const cors = require('cors')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5')
const api_mode = process.env.SELECT_API

const logger = require('./middleware/logger')
const not_found = require('./middleware/not_found')

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
app.use(express.static(path.join(__dirname, '..', '..', 'client')))
app.use(logger)
app.use((req, res, next) => {
    if (req.body) {
        req.body = mongo_sanitize.sanitize(req.body)
    }
    next()
})





const start = async () => {
    try{
        await connectDB()
        if (api_mode == "rest") {
            console.log("API MODE: REST")
            const auth_routes = require('./routes/auth_routes')
            const admin_routes = require('./routes/admin_routes')
            const user_routes = require('./routes/user_routes')
            const booking_routes = require('./routes/booking_routes')
            const upload_routes = require('./routes/upload')

            app.use('/api/auth', auth_routes)
            app.use('/api/admin', admin_routes)
            app.use('/api', user_routes)
            app.use('/api/bookings', booking_routes)
            app.use('/api', upload_routes)
        } else{
            console.log("API MODE: GRAPHQL")
            const typeDefs = require('./graphql/typeDefs')
            const resolvers = require('./graphql/resolvers')
            const server = new ApolloServer({ typeDefs, resolvers, })
            await server.start()
            app.use('/graphql', expressMiddleware(server, {
                context: async ({ req }) => ({ req })
            }))
        }
        app.use(not_found)
        app.use((err, req, res, next) => {
            res.status(err.status || 500).json({
                error: { message: err.message || "Internal Server Error" }
            })
        })
        app.listen(port, () => console.log(`Server running on port ${port}`))
    } catch(error) {
        console.error("Failed to start server: ", error)
        process.exit(1)
    }
}
start()