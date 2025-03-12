const axios = require('axios');

// Function to get data from Banana API
const getBananaData = async () => {
  try {
    const response = await axios.get('https://marcconrad.com/uob/banana/api.php'); // API
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error connecting to Banana API:", error);
  }
};

module.exports = getBananaData;
