const express = require('express');
const { getAllPodcasts, getPodcastById, createPodcast, updatePodcast, deletePodcast, subscribePodcast, unsubscribePodcast, getUserPodcasts } = require('../controllers/podcastController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET all podcasts (public) - must be before /:id
router.get('/', getAllPodcasts);

// User routes - specific paths before :id
router.get('/user/my-podcasts', protect, getUserPodcasts);
router.post('/:id/subscribe', protect, subscribePodcast);
router.post('/:id/unsubscribe', protect, unsubscribePodcast);

// Admin only routes
router.post('/', protect, authorize('admin'), createPodcast);
router.put('/:id', protect, authorize('admin'), updatePodcast);
router.delete('/:id', protect, authorize('admin'), deletePodcast);

// GET single podcast by ID (must be last)
router.get('/:id', getPodcastById);

module.exports = router;
