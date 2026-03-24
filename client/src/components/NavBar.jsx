import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')))

    const location = useLocation()
    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setUserData(JSON.parse(localStorage.getItem('user')))
    }, [location])

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">EngTutor</Link>
                <div className="navbar-nav ms-auto">
                    {token ? (
                        <>
                            <Link className="nav-link" to="/profile">My profile</Link>
                            <Link className="nav-link" to="/bookings">My bookings</Link>
                            {userData?.role === 'admin' && <Link className="nav-link" to="/admin">Admin panel</Link>}
                            <button onClick={handleLogout} className="btn btn-outline-light ms-2">Log out</button>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/login">Login</Link>
                            <Link className="nav-link" to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar