import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AdminDashboard = ({ user }) => {
  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Admin Dashboard</h1>
          <p className="text-muted">Welcome, {user?.name}! Manage products and users</p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="text-center">
              <h2 className="mb-3">📦</h2>
              <Card.Title>Products Management</Card.Title>
              <Card.Text>
                Add, update, and delete products from the system
              </Card.Text>
              <Link to="/admin/products">
                <Button variant="primary">Manage Products</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="text-center">
              <h2 className="mb-3">👥</h2>
              <Card.Title>Users Management</Card.Title>
              <Card.Text>
                Add, update, and remove user accounts
              </Card.Text>
              <Link to="/admin/users">
                <Button variant="primary">Manage Users</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="text-center">
              <h2 className="mb-3">⚙️</h2>
              <Card.Title>Settings</Card.Title>
              <Card.Text>
                Configure application settings and preferences
              </Card.Text>
              <Button variant="primary" disabled>Coming Soon</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
