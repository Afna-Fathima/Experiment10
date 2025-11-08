import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

const AdminRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    adminSecret: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (formData.password !== formData.passwordConfirm) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      const response = await api.post('/auth/register-admin', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        adminSecret: formData.adminSecret,
      })

      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/admin-dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={5}>
            <div style={{ background: '#282828', border: '1px solid #333', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' }}>
              <div className="text-center mb-4">
                <h2 className="mb-2" style={{ color: '#fff', fontWeight: 700 }}>Admin Registration</h2>
                <p style={{ color: '#b3b3b3' }}>Create an admin account to manage podcasts</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#fff', fontWeight: 500 }}>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    disabled={loading}
                    style={{ backgroundColor: '#404040', borderColor: '#535353', color: '#fff' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#fff', fontWeight: 500 }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                    style={{ backgroundColor: '#404040', borderColor: '#535353', color: '#fff' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#fff', fontWeight: 500 }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password (min 6 characters)"
                    minLength="6"
                    required
                    disabled={loading}
                    autoComplete="new-password"
                    style={{ backgroundColor: '#404040', borderColor: '#535353', color: '#fff' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#fff', fontWeight: 500 }}>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    minLength="6"
                    required
                    disabled={loading}
                    autoComplete="new-password"
                    style={{ backgroundColor: '#404040', borderColor: '#535353', color: '#fff' }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ color: '#fff', fontWeight: 500 }}>Admin Secret</Form.Label>
                  <Form.Control
                    type="password"
                    name="adminSecret"
                    value={formData.adminSecret}
                    onChange={handleChange}
                    placeholder="Enter admin secret key"
                    required
                    disabled={loading}
                    style={{ backgroundColor: '#404040', borderColor: '#535353', color: '#fff' }}
                  />
                  <Form.Text style={{ color: '#b3b3b3' }} className="small">
                    Enter: <code style={{ backgroundColor: '#1a1a1a', color: '#1db954', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>podcast_admin_2024_secret</code>
                  </Form.Text>
                </Form.Group>

                <Button 
                  variant="success" 
                  type="submit" 
                  className="w-100 py-2 fw-bold"
                  disabled={loading}
                  style={{ backgroundColor: '#1db954', border: 'none' }}
                >
                  {loading ? 'Creating Admin...' : 'Create Admin Account'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p style={{ color: '#b3b3b3', marginBottom: 0 }}>
                  Already have an account? <a href="/login" style={{ color: '#1db954', textDecoration: 'none' }}>Sign in</a>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminRegister
