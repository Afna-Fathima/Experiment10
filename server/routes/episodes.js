const express = require('express');
const { getEpisodesByPodcast, getEpisodeById, createEpisode, updateEpisode, deleteEpisode } = require('../controllers/episodeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Public routes
router.get('/', getEpisodesByPodcast);
router.get('/:episodeId', getEpisodeById);

// Admin only routes
router.post('/', protect, authorize('admin'), createEpisode);
router.put('/:episodeId', protect, authorize('admin'), updateEpisode);
router.delete('/:episodeId', protect, authorize('admin'), deleteEpisode);

module.exports = router;
