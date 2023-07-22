// script.js
const artistSelect = document.getElementById('artistSelect');
const artistNameElement = document.getElementById('artistName');
const artistImageElement = document.getElementById('artistImage');
const artistDescriptionElement = document.getElementById('artistDescription');
const artistInfoContainer = document.querySelector('.artist-info');

// Replace 'YOUR_AIRTABLE_API_KEY' and 'YOUR_AIRTABLE_BASE_ID' with your actual Airtable API key and base ID.
const AIRTABLE_API_KEY = 'YOUR_AIRTABLE_API_KEY';
const BASE_ID = 'YOUR_AIRTABLE_BASE_ID';
const TABLE_NAME = 'YOUR_TABLE_NAME';

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
      option.textContent = artist.fields['Artist Name'];
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
    artistNameElement.textContent = artist['Artist Name'];
    artistImageElement.src = artist['Image'][0].url;
    artistDescriptionElement.textContent = artist['Short Paragraph'];

    // Show the artist info container
    artistInfoContainer.style.display = 'block';
  })
  .catch(error => {
    console.error('Error fetching artist information:', error);
  });
});

// Fetch artist data when the page loads
fetchArtistData();
