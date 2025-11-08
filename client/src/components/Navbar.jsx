import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import './Navbar.css'

const NavbarComponent = ({ user, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="navbar-dark navbar-podcast">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold brand-podcast">
          <span className="brand-icon">🎙️</span> PodStream
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-podcast">
                  Sign In
                </Nav.Link>
                <Link to="/register">
                  <Button className="btn-primary-podcast-nav ms-2">
                    Get Started
                  </Button>
                </Link>
                <Link to="/admin-register">
                  <Button className="btn-outline-podcast-nav ms-2">
                    Create Podcast
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {user.role === 'admin' ? (
                  <>
                    <Nav.Link as={Link} to="/admin-dashboard" className="nav-link-podcast">
                      Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/podcasts" className="nav-link-podcast">
                      Manage Podcasts
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/users" className="nav-link-podcast">
                      Manage Users
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/user-dashboard" className="nav-link-podcast">
                      Discover
                    </Nav.Link>
                    <Nav.Link as={Link} to="/my-library" className="nav-link-podcast">
                      My Library
                    </Nav.Link>
                  </>
                )}
                <div className="nav-user-section">
                  <Nav.Link as={Link} to="/profile" className="nav-link-podcast">
                    <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                    {user.name}
                  </Nav.Link>
                  <Button 
                    className="btn-logout-podcast ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
