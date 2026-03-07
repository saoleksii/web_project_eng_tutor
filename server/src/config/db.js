const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(uri)
        console.log('Connected to mongoDB')
    }
    catch{
        console.log('mongoDB connection error')
    }
}

module.exports = connectDB()