const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Not valid email'] },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: {
        type: String, 
        enum: ['student', 'tutor', 'admin'], 
        default: 'student' 
    },
    is_verified: { type: Boolean, default: false },
    verif_token: { type: String },
    is_active: { type: Boolean, default: true },
    photo: { type: String, default: '' },
    experience: { type: String},
    description: { type: String},
    price: { type: Number},
    education: { type: String}
}, { 
    timestamps: true
});

module.exports = mongoose.model('user', user_schema)