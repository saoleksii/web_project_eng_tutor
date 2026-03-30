import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../App'

function Login() {
    const redirect = useNavigate()
    const { login } = useApi()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!formData.email) return setError("Enter your email")
        if(!formData.password) return setError("Enter your password")
        if(!formData.password) return setError("Enter your password")
        if(formData.password.length < 8) return setError("At least 8 characters password")
        if(!emailVal.test(formData.email)) return setError("Email is not valid")

        try {
            const { token, user } = await login(formData.email, formData.password)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            alert("Login successful")
            redirect('/')
        } catch (err) {
            setError(err.response?.data?.message || "Login error")
        }
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="col-md-4 offset-md-4 p-4 shadow rounded bg-white">
                <h3>Login</h3>
                <input type="text" placeholder="Email" className="form-control mb-3"
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password" className="form-control mb-3"
                    onChange={(e) => setFormData({...formData, password: e.target.value})} />
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-success w-100">Login</button>
            </form>
        </div>
    )
}

export default Login