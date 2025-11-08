const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide episode title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide episode description'],
  },
  audioUrl: {
    type: String,
    required: [true, 'Please provide audio file URL'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide episode duration in seconds'],
  },
  episodeNumber: {
    type: Number,
    required: [true, 'Please provide episode number'],
  },
  podcast: {
    type: mongoose.Schema.ObjectId,
    ref: 'Podcast',
    required: true,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  plays: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
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

module.exports = mongoose.model('Episode', episodeSchema);
