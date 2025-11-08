const Episode = require('../models/Episode');
const Podcast = require('../models/Podcast');

// @desc      Get all episodes for a podcast
// @route     GET /api/podcasts/:id/episodes
// @access    Public
exports.getEpisodesByPodcast = async (req, res, next) => {
  try {
    const episodes = await Episode.find({ podcast: req.params.id }).populate('createdBy', 'name').sort({ episodeNumber: -1 });

    res.status(200).json({
      success: true,
      count: episodes.length,
      data: episodes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Get single episode
// @route     GET /api/podcasts/:id/episodes/:episodeId
// @access    Public
exports.getEpisodeById = async (req, res, next) => {
  try {
    const episode = await Episode.findById(req.params.episodeId).populate('createdBy', 'name').populate('podcast', 'title artist');

    if (!episode) {
      return res.status(404).json({ success: false, message: 'Episode not found' });
    }

    // Increment play count
    episode.plays += 1;
    await episode.save();

    res.status(200).json({
      success: true,
      data: episode,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Create episode
// @route     POST /api/podcasts/:id/episodes
// @access    Private/Admin
exports.createEpisode = async (req, res, next) => {
  try {
    const { title, description, audioUrl, duration, episodeNumber } = req.body;

    if (!title || !description || !audioUrl || !duration || !episodeNumber) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
      return res.status(404).json({ success: false, message: 'Podcast not found' });
    }

    const episode = await Episode.create({
      title,
      description,
      audioUrl,
      duration,
      episodeNumber,
      podcast: req.params.id,
      createdBy: req.user.id,
    });

    // Update podcast episode count
    podcast.episodeCount += 1;
    await podcast.save();

    res.status(201).json({
      success: true,
      data: episode,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Update episode
// @route     PUT /api/podcasts/:id/episodes/:episodeId
// @access    Private/Admin
exports.updateEpisode = async (req, res, next) => {
  try {
    let episode = await Episode.findById(req.params.episodeId);

    if (!episode) {
      return res.status(404).json({ success: false, message: 'Episode not found' });
    }

    episode = await Episode.findByIdAndUpdate(req.params.episodeId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: episode,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Delete episode
// @route     DELETE /api/podcasts/:id/episodes/:episodeId
// @access    Private/Admin
exports.deleteEpisode = async (req, res, next) => {
  try {
    const episode = await Episode.findById(req.params.episodeId);

    if (!episode) {
      return res.status(404).json({ success: false, message: 'Episode not found' });
    }

    const podcast = await Podcast.findById(episode.podcast);
    if (podcast) {
      podcast.episodeCount = Math.max(0, podcast.episodeCount - 1);
      await podcast.save();
    }

    await Episode.findByIdAndDelete(req.params.episodeId);

    res.status(200).json({
      success: true,
      message: 'Episode deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
