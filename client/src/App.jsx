import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

// Public pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminRegister from './pages/AdminRegister'
import Discover from './pages/Discover'
import NotFound from './pages/NotFound'

// Protected pages
import UserDashboard from './pages/UserDashboard'
import MyLibrary from './pages/MyLibrary'
import UserProfile from './pages/UserProfile'
import ChangePassword from './pages/ChangePassword'

// Admin pages
import AdminDashboard from './pages/AdminDashboard'
import AdminPodcasts from './pages/AdminPodcasts'
import AdminUsers from './pages/AdminUsers'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/discover" element={<Discover />} />

        {/* Protected User Routes */}
        <Route 
          path="/user-dashboard" 
          element={<PrivateRoute user={user}><UserDashboard /></PrivateRoute>} 
        />
        <Route 
          path="/my-library" 
          element={<PrivateRoute user={user}><MyLibrary /></PrivateRoute>} 
        />
        <Route 
          path="/profile" 
          element={<PrivateRoute user={user}><UserProfile user={user} setUser={setUser} /></PrivateRoute>} 
        />
        <Route 
          path="/change-password" 
          element={<PrivateRoute user={user}><ChangePassword /></PrivateRoute>} 
        />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin-dashboard" 
          element={<PrivateRoute user={user} role="admin"><AdminDashboard user={user} /></PrivateRoute>} 
        />
        <Route 
          path="/admin/podcasts" 
          element={<PrivateRoute user={user} role="admin"><AdminPodcasts /></PrivateRoute>} 
        />
        <Route 
          path="/admin/users" 
          element={<PrivateRoute user={user} role="admin"><AdminUsers /></PrivateRoute>} 
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
