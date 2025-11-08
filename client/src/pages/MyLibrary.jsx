import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import api from '../utils/api'
import './UserDashboard.css'

const MyLibrary = () => {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSubscribedPodcasts()
  }, [])

  const fetchSubscribedPodcasts = async () => {
    try {
      console.log('Fetching user podcasts...');
      console.log('Token from localStorage:', localStorage.getItem('token'));
      const response = await api.get('/podcasts/user/my-podcasts')
      console.log('Response:', response.data);
      if (response.data.success) {
        setPodcasts(response.data.data || [])
      }
    } catch (err) {
      console.error('Error fetching podcasts:', err);
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || 'Failed to fetch your library')
    } finally {
      setLoading(false)
    }
  }

  const handleUnsubscribe = async (podcastId) => {
    try {
      await api.post(`/podcasts/${podcastId}/unsubscribe`)
      fetchSubscribedPodcasts()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unsubscribe')
    }
  }

  return (
    <div className="user-dashboard">
      <Container fluid className="py-5">
        <Row className="mb-5">
          <Col>
            <h1 className="dashboard-title">📚 My Library</h1>
            <p className="dashboard-subtitle">Your subscribed podcasts</p>
          </Col>
        </Row>

        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

        {loading ? (
          <Row className="justify-content-center py-5">
            <Col md={6} className="text-center">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading your library...</p>
            </Col>
          </Row>
        ) : podcasts.length === 0 ? (
          <Row>
            <Col lg={12}>
              <Alert variant="info" className="text-center py-5">
                <h5>No Subscribed Podcasts Yet</h5>
                <p>Go to Discover to find and subscribe to your favorite podcasts!</p>
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row className="g-4">
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
                      <button className="play-button">
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

                      <button 
                        className="subscribe-btn unsubscribe-btn"
                        onClick={() => handleUnsubscribe(podcast._id)}
                      >
                        ✓ Subscribed
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default MyLibrary
