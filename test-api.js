const axios = require('axios');

const testAPI = async () => {
  try {
    console.log('Testing API endpoint: http://localhost:5000/api/podcasts');
    const response = await axios.get('http://localhost:5000/api/podcasts');
    console.log('\n✅ API Response Status:', response.status);
    console.log('\n📊 Response Data Structure:');
    console.log('  - success:', response.data.success);
    console.log('  - count:', response.data.count);
    console.log('  - data array length:', response.data.data?.length);
    
    if (response.data.data && response.data.data.length > 0) {
      console.log('\n🎙️  First Podcast:');
      const first = response.data.data[0];
      console.log('  - _id:', first._id);
      console.log('  - title:', first.title);
      console.log('  - artist:', first.artist);
      console.log('  - genre:', first.genre);
      console.log('  - episodeCount:', first.episodeCount);
      console.log('  - isActive:', first.isActive);
      console.log('  - subscribers.length:', first.subscribers?.length);
      console.log('\n✅ All podcasts:');
      response.data.data.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.title} by ${p.artist}`);
      });
    }
    
    console.log('\n✅ API is working correctly!');
  } catch (error) {
    console.error('❌ Error testing API:');
    console.error('  -', error.message);
    if (error.response) {
      console.error('  - Status:', error.response.status);
      console.error('  - Data:', error.response.data);
    }
  }
};

testAPI();
