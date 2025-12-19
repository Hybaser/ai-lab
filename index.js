const express = require('express');
const app = express();
const port = 3000;

// Dummy weather data for now
const weatherData = {
  "New York": {
    "temperature": "20°C",
    "condition": "Cloudy",
    "humidity": "60%"
  },
  "London": {
    "temperature": "15°C",
    "condition": "Rainy",
    "humidity": "80%"
  },
  "Tokyo": {
    "temperature": "25°C",
    "condition": "Sunny",
    "humidity": "50%"
  }
};

app.get('/weather', (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City name is required as a query parameter.' });
  }

  const data = weatherData[city];

  if (data) {
    res.json({
      city: city,
      weather: data
    });
  } else {
    res.status(404).json({ error: `Weather data not found for city: ${city}` });
  }
});

app.listen(port, () => {
  console.log(`Weather app listening at http://localhost:${port}`);
});
