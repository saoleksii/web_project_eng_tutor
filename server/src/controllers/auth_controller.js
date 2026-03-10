const user_model = require('../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const mail_username = process.env.EMAIL_USERNAME
const mail_pass = process.env.EMAIL_PASS
const jwt_key = process.env.JWT_SECRET

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: mail_username,
    pass: mail_pass
  }
})

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body
        const isActive = role === 'tutor' ? false : true

        const hashed_password = await bcrypt.hash(password, 10)
        const verif_token = crypto.randomBytes(32).toString('hex')

        const new_user = new user_model({
            name,
            email,
            password: hashed_password,
            phone,
            role: role || 'student',
            verif_token,
            is_active: isActive
        })

        await new_user.save()

        const verif_url = `http://localhost:8000/api/auth/verify/${verif_token}`

        await transport.sendMail({
            from: 'EngTutor <noreply@engtutor.com>',
            to: email,
            subject: 'Confirm Registration',
            html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px;">
                <h2>Welcome, ${name}!</h2>
                <p>To complete your registration, please click the button below:</p>
                <a href="${verif_url}" style="background: #0d6efd; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Verify Account
                </a>
            </div>`
        })

        res.status(201).json({ message: "Confirm your email" })

    } catch (error) {
        res.status(400).json({ message: "Registration error", error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await user_model.findOne({ email })

        if (!user) return res.status(404).json({ message: "User not found" })
        
        if (!user.is_verified) {
            return res.status(401).json({ message: "Please verify your email first" })
        }

        const is_match = await bcrypt.compare(password, user.password)
        if (!is_match) return res.status(400).json({ message: "Invalid password" })

        const token = jwt.sign(
            { id: user._id, role: user.role }, jwt_key, { expiresIn: '2h'}
        )

        res.status(200).json({ 
            message: "Logged in successfully", token,
            user: { id: user._id, role: user.role, name: user.name } 
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.verify_email = async (req, res) => {
    try {
        const { token } = req.params
        const user = await user_model.findOne({ verif_token: token })

        if (!user) return res.status(400).send("Invalid token")

        user.is_verified = true
        user.verif_token = undefined
        await user.save()

        res.send("<h1>Email verified! You can now close this tab and login.</h1>")
    } catch (error) {
        res.status(500).send("Server error")
    }
}