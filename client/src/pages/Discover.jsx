import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import api from '../utils/api'
import PodcastPlayer from '../components/PodcastPlayer'
import './UserDashboard.css'

const Discover = () => {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPodcast, setSelectedPodcast] = useState(null)

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const fetchPodcasts = async () => {
    try {
      console.log('Fetching podcasts from /api/podcasts...')
      const response = await api.get('/podcasts')
      console.log('API Response:', response)
      console.log('Response data:', response.data)
      console.log('Podcasts array:', response.data.data)
      console.log('Podcasts count:', response.data.data?.length)
      
      if (response.data.success && response.data.data) {
        console.log('Setting podcasts to state:', response.data.data)
        setPodcasts(response.data.data)
      } else {
        console.warn('Unexpected response format')
        setPodcasts([])
      }
    } catch (err) {
      console.error('Error fetching podcasts:', err)
      console.error('Error response:', err.response)
      setError(err.response?.data?.message || 'Failed to fetch podcasts')
      setPodcasts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="user-dashboard">
      <Container fluid className="py-5">
        <Row className="mb-5">
          <Col>
            <h1 className="dashboard-title">🎧 Discover Podcasts</h1>
            <p className="dashboard-subtitle">Find and subscribe to your favorite shows</p>
          </Col>
        </Row>

        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

        {loading ? (
          <Row className="justify-content-center py-5">
            <Col md={6} className="text-center">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading podcasts...</p>
            </Col>
          </Row>
        ) : podcasts && podcasts.length > 0 ? (
          <Row className="g-4 mb-5">
            {podcasts.map((podcast) => (
              <Col key={podcast._id} xs={12} sm={6} lg={4} xl={3} className="d-flex">
                <div className="podcast-card-wrapper w-100">
                  <div className="podcast-card">
                    <div className="podcast-image-container">
                      <img 
                        src={podcast.coverImage || 'https://via.placeholder.com/300x300?text=Podcast'} 
                        alt={podcast.title}
                        className="podcast-image"
                      />
                      <div className="overlay"></div>
                      <button 
                        className="play-button" 
                        title="Play"
                        onClick={() => setSelectedPodcast(podcast)}
                      >
                        <span>▶</span>
                      </button>
                    </div>

                    <div className="podcast-info">
                      <h5 className="podcast-title">{podcast.title}</h5>
                      <p className="podcast-artist">{podcast.artist}</p>
                      
                      <div className="podcast-meta mb-3">
                        {podcast.genre && (
                          <span className="genre-badge">{podcast.genre}</span>
                        )}
                        <span className="episode-count">
                          {podcast.episodeCount || 0} Episodes
                        </span>
                      </div>

                      <p className="podcast-description">{podcast.description}</p>

                      <div className="podcast-stats mb-3">
                        <span className="stat-item">
                          👥 {podcast.subscribers?.length || 0} Subscribers
                        </span>
                      </div>

                      <button 
                        className="subscribe-btn"
                        onClick={() => alert('Please login to subscribe')}
                      >
                        + Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            <Col lg={12}>
              <Alert variant="info" className="text-center py-5">
                <h5>No Podcasts Available</h5>
                <p>No podcasts found in the system</p>
              </Alert>
            </Col>
          </Row>
        )}
      </Container>

      {selectedPodcast && (
        <PodcastPlayer 
          podcast={selectedPodcast} 
          onClose={() => setSelectedPodcast(null)}
        />
      )}
    </div>
  )
}

export default Discover
