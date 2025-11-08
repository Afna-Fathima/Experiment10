const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a podcast title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  artist: {
    type: String,
    required: [true, 'Please provide the artist/host name'],
  },
  genre: {
    type: String,
    required: [true, 'Please provide a genre'],
    enum: ['Technology', 'Entertainment', 'News', 'Business', 'Sports', 'Education', 'Health', 'True Crime', 'Comedy', 'Other'],
  },
  coverImage: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Podcast+Cover',
  },
  episodeCount: {
    type: Number,
    default: 0,
  },
  subscribers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Podcast', podcastSchema);
