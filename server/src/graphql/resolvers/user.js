const user_model = require('../../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASS
  }
})

const user_resolver = {
    Query: {
        get_tutors: async (parent, args, context) => {
            if(!context.user) return null
            return await user_model.find({role: 'tutor', is_active: true})
        },
        get_user: async (parent, args, context) => {
            if(!context.user) throw new Error('User not found')
            return await user_model.findById(context.user.id).select('-password')
        }
    },
    Mutation: {
        update_me: async (parent, args, context) => {
            if(!context.user) return null
            const user =  await user_model.findByIdAndUpdate(context.user.id, args, {new: true})
            if (!user) throw new Error('User not found')
            return user
        },
        register: async (parent, args, context) => {
            const user = await user_model.findOne( {email: args.email })
            if (user) throw new GraphQLError("Email is registered, login", { extensions: { code: 'BAD_REQUEST' }})
            const is_active = args.role == 'tutor' ? false : true
            const password = await bcrypt.hash(args.password, 10)
            const verif_token = crypto.randomBytes(32).toString('hex')
            const new_user = new user_model({
                ...args,
                password,
                role: args.role || 'student',
                verif_token,
                is_active,
                is_verified: false
            })
            await new_user.save()
            const verif_url = `http://localhost:8000/verify/${verif_token}`

            await transport.sendMail({
                from: 'EngTutor <noreply@engtutor.com>',
                to: args.email,
                subject: 'Confirm Registration',
                html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Welcome, ${args.name}!</h2>
                    <p>Click below to verify:</p>
                    <a href="${verif_url}" style="background: #0d6efd; color: white; padding: 12px 20px; text-decoration: none;">Verify Account</a>
                </div>`
            })
            return "Confirm your email"
        },
        login: async (parent, {email, password}, context) => {
            const user = await user_model.findOne({email})
            if(!user) throw new GraphQLError("User not found", { extensions: { code: 'NOT_FOUND' }})
            if(!user.is_verified) throw new GraphQLError("Confirm your email", { extensions: { code: 'FORBIDDEN' }})
            const check_pass = await bcrypt.compare(password, user.password)
            if(!check_pass) throw new GraphQLError("Wrong password", { extensions: {code: 'UNAUTHENTICATED'}})
            const token = jwt.sign(
                { id: user._id, role: user.role},
                process.env.JWT_SECRET,
                { expiresIn: '2h'}
            )
            return {
                message: "Succesful login",
                token,
                user
            }
        }
    }
}

module.exports = user_resolver