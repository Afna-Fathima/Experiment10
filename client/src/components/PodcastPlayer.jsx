import React, { useState, useRef } from 'react'
import './PodcastPlayer.css'

const PodcastPlayer = ({ podcast, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="podcast-player-modal">
      <div className="podcast-player-backdrop" onClick={onClose}></div>
      <div className="podcast-player-content">
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="player-album-art">
          <img 
            src={podcast.coverImage || 'https://via.placeholder.com/300x300?text=Podcast'} 
            alt={podcast.title}
          />
        </div>

        <div className="player-info">
          <h2 className="player-title">{podcast.title}</h2>
          <p className="player-artist">{podcast.artist}</p>
          <p className="player-description">{podcast.description}</p>
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        >
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        </audio>

        <div className="player-controls">
          <div className="progress-bar-container">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="progress-bar"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>

          <div className="control-buttons">
            <button className="control-btn">⏮</button>
            <button className="control-btn play-btn" onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="control-btn">⏭</button>
          </div>

          <div className="volume-control">
            <span>🔊</span>
            <input type="range" min="0" max="100" defaultValue="70" className="volume-slider" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodcastPlayer
