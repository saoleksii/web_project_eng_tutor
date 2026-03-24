import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import Register from './pages/Register'
import Start from './pages/Start'
import Profile from './pages/Profile'
import Bookings from './pages/Bookings'
import NavBar from './components/NavBar'

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    if (!token) return <Navigate to="/login" replace />

    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp * 1000 < Date.now()) {
            localStorage.clear()
            return <Navigate to="/login" replace />
        }
    } catch {
        localStorage.clear()
        return <Navigate to="/login" replace />
    }

    return children
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Start />} />
        <Route path="/admin" element={
            <ProtectedRoute>
                <AdminPanel />
            </ProtectedRoute>
        } />
        <Route path="/profile" element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        } />
        <Route path="/bookings" element={
            <ProtectedRoute>
                <Bookings />
            </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App