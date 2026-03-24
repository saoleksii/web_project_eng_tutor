import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { isValidPhoneNumber } from 'libphonenumber-js'

function Register() {
    const [formData, setFormData] = useState(
        { name: '', email: '', password: '', phone: '', role: 'student'})
    const [error, setError] = useState('')
    const redirect = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!formData.name) return setError("Enter your name")
        if(!formData.email) return setError("Enter your email")
        if(!formData.password) return setError("Enter your password")
        if(!formData.phone) return setError("Enter your phone")
        if(!emailVal.test(formData.email)) return setError("Email is not valid")
        if(!isValidPhoneNumber('+' + formData.phone)) return setError("Phone is not valid")

        try {
            const res = await api.post('/auth/register', formData)
            alert(res.data.message)
            redirect('/login')
        } catch (err) {
            setError(err.response?.data?.message || "Registration error")
        }
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="col-md-4 offset-md-4 p-4 shadow rounded bg-white">
                <h3>Registration</h3>
                <div className="btn-group w-100 mb-4" role="group">
                    <input 
                        type="radio" 
                        className="btn-check" 
                        name="role" 
                        id="student" 
                        autoComplete="off" 
                        checked={formData.role === 'student'}
                        onChange={() => setFormData({...formData, role: 'student'})}
                    />
                    <label className="btn btn-outline-primary" htmlFor="student">I am a Student</label>

                    <input 
                        type="radio" 
                        className="btn-check" 
                        name="role" 
                        id="tutor" 
                        autoComplete="off" 
                        checked={formData.role === 'tutor'}
                        onChange={() => setFormData({...formData, role: 'tutor'})}
                    />
                    <label className="btn btn-outline-primary" htmlFor="tutor">I am a Tutor</label>
                </div>
                <input type="text" placeholder="Full name" className="form-control mb-3"
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="text" placeholder="Email" className="form-control mb-3"
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <div className="mb-3">
                    <PhoneInput
                    className="mb-3"
                    country="ua"
                    value={formData.phone}
                    inputClass="form-control w-100"
                    onChange={(value) => setFormData({...formData, phone: value})}
                    containerClass="w-100"
                    buttonClass="border-end-0"
                    />
                </div>
                <input type="password" placeholder="Password" className="form-control mb-3"
                    onChange={(e) => setFormData({...formData, password: e.target.value})} />
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-success w-100">Register</button>
            </form>
        </div>
    )
}

export default Register