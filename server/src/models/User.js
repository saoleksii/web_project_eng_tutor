const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { 
        type: String, 
        enum: ['student', 'tutor', 'admin'], 
        default: 'student' 
    },
    is_verified: { type: Boolean, default: false },
    verif_token: { type: String },
    is_active: { type: Boolean, default: true }
}, { 
    timestamps: true
});

module.exports = mongoose.model('user', user_schema)