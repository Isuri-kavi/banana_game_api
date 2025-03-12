const axios = require('axios');

const BANANA_API_URL = 'https://marcconrad.com/uob/banana/api.php'; // Replace with the actual endpoint

const fetchGameData = async () => {
    try {
        const response = await axios.get(BANANA_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching game data:', error.message);
        throw new Error('Failed to fetch game data');
    }
};

module.exports = { fetchGameData };
