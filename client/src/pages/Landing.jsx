import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="podcast-hero">
        <Container fluid className="h-100">
          <Row className="h-100 align-items-center">
            <Col lg={6} className="text-white">
              <h1 className="hero-title">Discover Your Next Favorite Podcast</h1>
              <p className="hero-subtitle">Stream thousands of shows, episodes, and creators. All in one place.</p>
              <div className="d-flex gap-3 mt-5">
                <Link to="/discover">
                  <Button className="btn-primary-podcast" size="lg">Browse Podcasts</Button>
                </Link>
                <Link to="/login">
                  <Button className="btn-outline-podcast" size="lg">Sign In</Button>
                </Link>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="hero-image">
                <div className="podcast-stack">
                  <div className="podcast-card card-1">🎙️</div>
                  <div className="podcast-card card-2">🎧</div>
                  <div className="podcast-card card-3">🎬</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5 section-title">Why Choose PodStream?</h2>
        <Row className="g-4">
          <Col md={6} lg={4}>
            <Card className="feature-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="feature-icon">🎙️</div>
                <h5 className="mt-3 mb-2">Vast Collection</h5>
                <p className="text-muted">Browse thousands of podcasts across all genres and topics</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="feature-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="feature-icon">🔐</div>
                <h5 className="mt-3 mb-2">Secure & Private</h5>
                <p className="text-muted">Your data is protected with enterprise-grade security</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="feature-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="feature-icon">📚</div>
                <h5 className="mt-3 mb-2">Save Favorites</h5>
                <p className="text-muted">Build your personal library and subscribe to your favorites</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="feature-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="feature-icon">📱</div>
                <h5 className="mt-3 mb-2">Access Anywhere</h5>
                <p className="text-muted">Listen on all your devices with seamless synchronization</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="feature-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="feature-icon">✨</div>
                <h5 className="mt-3 mb-2">Personalized Feed</h5>
                <p className="text-muted">Get recommendations tailored to your listening preferences</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="feature-card h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="feature-icon">🌍</div>
                <h5 className="mt-3 mb-2">Global Community</h5>
                <p className="text-muted">Connect with millions of podcast listeners worldwide</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <div className="podcast-cta bg-dark text-white py-5">
        <Container className="text-center">
          <h2 className="mb-3">Ready to Start Your Journey?</h2>
          <p className="lead mb-4">Join thousands of listeners discovering great content every day</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/register">
              <Button className="btn-primary-podcast" size="lg">Create Free Account</Button>
            </Link>
            <Link to="/admin-register">
              <Button className="btn-outline-podcast" size="lg">Create Podcast</Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Landing
