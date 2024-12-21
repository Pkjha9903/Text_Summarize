const axios = require('axios');
require('dotenv').config();
const token = process.env.HUGGINGFACE_API_TOKEN;
console.log(token);


async function summarizeText(text) {
  // Create the data object to send in the request
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  // Configure the request with headers and data
  let config = {
    method: 'post',
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token, // Ensure the token is correct
    },
    data: data // Use the prepared JSON string here
  };

  try {
    // Make the POST request and return the summary text
    const response = await axios.request(config);
    return response.data[0].summary_text;
  } catch (err) {
    // Log error to debug
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

module.exports = summarizeText;