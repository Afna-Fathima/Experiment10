const Podcast = require('../models/Podcast');

// @desc      Get all podcasts
// @route     GET /api/podcasts
// @access    Public
exports.getAllPodcasts = async (req, res, next) => {
  try {
    const podcasts = await Podcast.find({ isActive: true }).populate('createdBy', 'name').populate('subscribers', 'name email');
    console.log(`Found ${podcasts.length} active podcasts`);
    res.status(200).json({
      success: true,
      count: podcasts.length,
      data: podcasts,
    });
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Get single podcast
// @route     GET /api/podcasts/:id
// @access    Public
exports.getPodcastById = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.id).populate('createdBy', 'name email').populate('subscribers', 'name email');

    if (!podcast) {
      return res.status(404).json({ success: false, message: 'Podcast not found' });
    }

    res.status(200).json({
      success: true,
      data: podcast,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Create podcast
// @route     POST /api/podcasts
// @access    Private/Admin
exports.createPodcast = async (req, res, next) => {
  try {
    const { title, description, artist, genre, coverImage } = req.body;

    if (!title || !description || !artist || !genre) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const podcast = await Podcast.create({
      title,
      description,
      artist,
      genre,
      coverImage,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: podcast,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Update podcast
// @route     PUT /api/podcasts/:id
// @access    Private/Admin
exports.updatePodcast = async (req, res, next) => {
  try {
    let podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({ success: false, message: 'Podcast not found' });
    }

    podcast = await Podcast.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: podcast,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Delete podcast
// @route     DELETE /api/podcasts/:id
// @access    Private/Admin
exports.deletePodcast = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({ success: false, message: 'Podcast not found' });
    }

    await Podcast.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Podcast deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Subscribe to podcast
// @route     POST /api/podcasts/:id/subscribe
// @access    Private
exports.subscribePodcast = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({ success: false, message: 'Podcast not found' });
    }

    if (podcast.subscribers.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: 'Already subscribed to this podcast' });
    }

    podcast.subscribers.push(req.user.id);
    await podcast.save();

    res.status(200).json({
      success: true,
      message: 'Subscribed to podcast successfully',
      data: podcast,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Unsubscribe from podcast
// @route     POST /api/podcasts/:id/unsubscribe
// @access    Private
exports.unsubscribePodcast = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({ success: false, message: 'Podcast not found' });
    }

    podcast.subscribers = podcast.subscribers.filter(id => id.toString() !== req.user.id.toString());
    await podcast.save();

    res.status(200).json({
      success: true,
      message: 'Unsubscribed from podcast successfully',
      data: podcast,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc      Get user's subscribed podcasts
// @route     GET /api/podcasts/user/my-podcasts
// @access    Private
exports.getUserPodcasts = async (req, res, next) => {
  try {
    const podcasts = await Podcast.find({ subscribers: req.user.id }).populate('createdBy', 'name');

    res.status(200).json({
      success: true,
      count: podcasts.length,
      data: podcasts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
