import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button, Form, Modal, Alert } from 'react-bootstrap'
import api from '../utils/api'

const AdminPodcasts = () => {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    artist: '',
    genre: 'Technology',
    coverImage: '',
  })

  const genres = ['Technology', 'Entertainment', 'News', 'Business', 'Sports', 'Education', 'Health', 'True Crime', 'Comedy', 'Other']

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const fetchPodcasts = async () => {
    try {
      const response = await api.get('/podcasts')
      if (response.data.success) {
        setPodcasts(response.data.data)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch podcasts')
    } finally {
      setLoading(false)
    }
  }

  const handleShowModal = (podcast = null) => {
    if (podcast) {
      setEditingId(podcast._id)
      setFormData({
        title: podcast.title,
        description: podcast.description,
        artist: podcast.artist,
        genre: podcast.genre,
        coverImage: podcast.coverImage,
      })
    } else {
      setEditingId(null)
      setFormData({
        title: '',
        description: '',
        artist: '',
        genre: 'Technology',
        coverImage: '',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        await api.put(`/podcasts/${editingId}`, formData)
      } else {
        await api.post('/podcasts', formData)
      }
      handleCloseModal()
      fetchPodcasts()
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this podcast?')) {
      try {
        await api.delete(`/podcasts/${id}`)
        fetchPodcasts()
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete podcast')
      }
    }
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>🎙️ Podcasts Management</h1>
          <p className="text-muted">Add, update, and delete podcasts</p>
        </Col>
        <Col md="auto">
          <Button variant="success" onClick={() => handleShowModal()}>
            + Add Podcast
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : podcasts.length === 0 ? (
                <Alert variant="info">No podcasts found</Alert>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Genre</th>
                        <th>Episodes</th>
                        <th>Subscribers</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {podcasts.map((podcast) => (
                        <tr key={podcast._id}>
                          <td>{podcast.title}</td>
                          <td>{podcast.artist}</td>
                          <td><span className="badge bg-primary">{podcast.genre}</span></td>
                          <td>{podcast.episodeCount}</td>
                          <td>{podcast.subscribers?.length || 0}</td>
                          <td>
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleShowModal(podcast)}
                              className="me-2"
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleDelete(podcast._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Podcast' : 'Add New Podcast'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Podcast Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Artist/Host Name</Form.Label>
              <Form.Control
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cover Image URL</Form.Label>
              <Form.Control
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {editingId ? 'Update Podcast' : 'Add Podcast'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default AdminPodcasts
