import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import Register from './pages/Register'
import Start from './pages/Start'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Start />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App