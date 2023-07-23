// script.js
const artistSelect = document.getElementById('artistSelect');
const artistNameElement = document.getElementById('artistName');
const artistImageElement = document.getElementById('artistImage');
const artistDescriptionElement = document.getElementById('artistDescription');
const artistBirthDateElement = document.getElementById('artistBirthDate');
const artistInfoContainer = document.querySelector('.artist-info');
const imageCaptionElement = document.getElementById('imageCaption');

// Replace 'YOUR_AIRTABLE_API_KEY' and 'YOUR_AIRTABLE_BASE_ID' with your actual Airtable API key and base ID.
const AIRTABLE_API_KEY = 'patKypMilGv2SPk3D.0b6dbc88a34de777a252c631047c33bc055814b9afaaba44404db2de2ac6dab8';
const BASE_ID = 'apposd1OZKLqWL18c';
const TABLE_NAME = 'Artist';

// Fetch artist data from Airtable using the Airtable API
function fetchArtistData() {
  const endpoint = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  axios.get(endpoint, {
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`
    }
  })
  .then(response => {
    const data = response.data.records;
    // Populate the dropdown with artist names
    data.forEach(artist => {
      const option = document.createElement('option');
      option.value = artist.id;
      option.textContent = artist.fields['Name'];
      artistSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching artist data:', error);
  });
}

// Event listener for dropdown selection
artistSelect.addEventListener('change', (event) => {
  const selectedArtistId = event.target.value;
  // Fetch the detailed artist information based on the selected ID
  const endpoint = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${selectedArtistId}`;

  axios.get(endpoint, {
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`
    }
  })
  .then(response => {
    const artist = response.data.fields;
    // Display the selected artist's information
    artistNameElement.textContent = artist['Name'];
    artistImageElement.src = artist['Work'][0].url;
    artistBirthDateElement.textContent = artist['Born'];
    artistDescriptionElement.textContent = artist['Artist Info'];
     imageCaptionElement.textContent = artist['Caption'];

    // Show the artist info container
    artistInfoContainer.style.display = 'block';
  })
  .catch(error => {
    console.error('Error fetching artist information:', error);
  });
});

// Fetch artist data when the page loads
fetchArtistData();
