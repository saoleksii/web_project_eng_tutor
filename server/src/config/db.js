const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(uri)
        console.log('Connected to mongoDB')
    }
    catch (error) {
        console.error('MongoDB connection error:', error.message)
        process.exit(1)
    }
}

module.exports = connectDB