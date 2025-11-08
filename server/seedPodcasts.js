const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Podcast = require('./models/Podcast');
const User = require('./models/User');

const seedPodcasts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find or create an admin user
    let admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@podcast.com',
        password: 'admin123456',
        role: 'admin'
      });
      console.log('Created admin user');
    }

    // Sample podcasts data
    const samplePodcasts = [
      {
        title: 'The Joe Rogan Experience',
        description: 'Long-form conversational podcast featuring interviews with various guests including scientists, athletes, politicians, and comedians.',
        artist: 'Joe Rogan',
        genre: 'Entertainment',
        coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop',
        episodeCount: 1850,
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'The Daily',
        description: 'A daily news podcast providing in-depth analysis of the most important stories of the day.',
        artist: 'Michael Barbaro',
        genre: 'News',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        episodeCount: 1200,
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'Stuff You Should Know',
        description: 'A podcast about interesting topics you should know about. Learn the origin of everything from slang to science.',
        artist: 'Josh Clark & Chuck Bryant',
        genre: 'Education',
        coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop',
        episodeCount: 750,
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'My Favorite Murder',
        description: 'True crime podcast featuring hosts Karen Kilgariff and Georgia Hardstark discussing various murders and mysteries.',
        artist: 'Karen Kilgariff & Georgia Hardstark',
        genre: 'True Crime',
        coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
        episodeCount: 450,
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'TED Radio Hour',
        description: 'Curated talks from TED speakers on topics ranging from technology to business to design.',
        artist: 'Guy Raz',
        genre: 'Technology',
        coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop',
        episodeCount: 600,
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'The Bill Simmons Podcast',
        description: 'Sports and entertainment podcast featuring conversations about movies, TV, and pop culture.',
        artist: 'Bill Simmons',
        genre: 'Sports',
        coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
        episodeCount: 800,
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'Comedy Bang! Bang!',
        description: 'A comedy improvisation podcast with absurdist humor and celebrity guests.',
        artist: 'Scott Aukerman',
        genre: 'Comedy',
        coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
        episodeCount: 500,
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'How to Fail',
        description: 'A podcast about lessons learned from failure in business and life.',
        artist: 'Elizabeth Day',
        genre: 'Business',
        coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop',
        episodeCount: 350,
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'The Health Show',
        description: 'A podcast dedicated to health, wellness, and medical breakthroughs.',
        artist: 'Dr. Sarah Johnson',
        genre: 'Health',
        coverImage: 'https://images.unsplash.com/photo-1505470468204-52289602cf22?w=300&h=300&fit=crop',
        episodeCount: 280,
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'StartUp',
        description: 'A podcast about building businesses from the ground up, featuring founders and entrepreneurs.',
        artist: 'Alex Blumberg',
        genre: 'Business',
        coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop',
        episodeCount: 400,
        createdBy: admin._id,
        isActive: true
      }
    ];

    // Clear existing podcasts
    await Podcast.deleteMany({});
    console.log('Cleared existing podcasts');

    // Insert sample podcasts
    const insertedPodcasts = await Podcast.insertMany(samplePodcasts);
    console.log(`Successfully added ${insertedPodcasts.length} podcasts!`);

    // Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding podcasts:', error);
    process.exit(1);
  }
};

seedPodcasts();
