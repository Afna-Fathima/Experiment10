import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-4">
            The page you are looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Go Back Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
