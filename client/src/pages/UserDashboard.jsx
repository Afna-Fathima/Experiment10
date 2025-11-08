import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import api from '../utils/api'
import PodcastPlayer from '../components/PodcastPlayer'
import './UserDashboard.css'

const UserDashboard = () => {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPodcast, setSelectedPodcast] = useState(null)

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const fetchPodcasts = async () => {
    try {
      const response = await api.get('/podcasts')
      console.log('API Response:', response)
      console.log('Response data:', response.data)
      console.log('Response data.data:', response.data.data)
      console.log('Response data.data length:', response.data.data?.length)
      
      if (response.data.success && response.data.data) {
        console.log('Setting podcasts:', response.data.data)
        setPodcasts(response.data.data)
        console.log('Podcasts state updated')
      } else {
        setPodcasts([])
      }
    } catch (err) {
      console.error('Error fetching podcasts:', err)
      console.error('Error response:', err.response)
      setError(err.response?.data?.message || 'Failed to fetch podcasts')
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async (podcastId) => {
    try {
      await api.post(`/podcasts/${podcastId}/subscribe`)
      fetchPodcasts()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to subscribe')
    }
  }

  const handleUnsubscribe = async (podcastId) => {
    try {
      await api.post(`/podcasts/${podcastId}/unsubscribe`)
      fetchPodcasts()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unsubscribe')
    }
  }

  const isSubscribed = (podcastId) => {
    // Check if user is subscribed (would need to fetch user data or track in state)
    return false
  }

  // Organize podcasts by genre
  const podcastsByGenre = {}
  podcasts.forEach(podcast => {
    const genre = podcast.genre || 'Other'
    if (!podcastsByGenre[genre]) {
      podcastsByGenre[genre] = []
    }
    podcastsByGenre[genre].push(podcast)
  })

  const renderPodcastCard = (podcast) => (
    <div key={podcast._id} className="spotify-card">
      <div className="spotify-card-image">
        <img 
          src={podcast.coverImage || 'https://via.placeholder.com/300x300?text=Podcast'} 
          alt={podcast.title}
        />
        <div className="spotify-overlay"></div>
        <button 
          className="spotify-play-btn" 
          onClick={() => setSelectedPodcast(podcast)}
        >
          ▶
        </button>
      </div>
      <div className="spotify-card-info">
        <h6 className="spotify-card-title">{podcast.title}</h6>
        <p className="spotify-card-artist">{podcast.artist}</p>
      </div>
    </div>
  )

  return (
    <div className="user-dashboard">
      <div className="spotify-header">
        <h1 className="spotify-main-title">🎧 PodStream</h1>
        <p className="spotify-main-subtitle">Discover your favorite podcasts</p>
      </div>

      {error && <Alert variant="danger" className="mb-4" style={{ marginLeft: '1rem', marginRight: '1rem' }}>{error}</Alert>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#b3b3b3' }}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading podcasts...</p>
        </div>
      ) : podcasts && podcasts.length > 0 ? (
        <div className="spotify-sections">
          {/* Featured/Top Podcasts Section */}
          <div className="spotify-section">
            <div className="spotify-section-header">
              <h2 className="spotify-section-title">Featured Podcasts</h2>
              <a href="#" className="spotify-show-all">Show all</a>
            </div>
            <div className="spotify-horizontal-scroll">
              {podcasts.slice(0, 6).map(renderPodcastCard)}
            </div>
          </div>

          {/* Podcasts by Genre */}
          {Object.entries(podcastsByGenre).slice(0, 3).map(([genre, genrePodcasts]) => (
            <div key={genre} className="spotify-section">
              <div className="spotify-section-header">
                <h2 className="spotify-section-title">{genre} Podcasts</h2>
                <a href="#" className="spotify-show-all">Show all</a>
              </div>
              <div className="spotify-horizontal-scroll">
                {genrePodcasts.map(renderPodcastCard)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#b3b3b3' }}>
          <h5>No Podcasts Available</h5>
        </div>
      )}

      {selectedPodcast && (
        <PodcastPlayer 
          podcast={selectedPodcast} 
          onClose={() => setSelectedPodcast(null)}
        />
      )}
    </div>
  )
}

export default UserDashboard
