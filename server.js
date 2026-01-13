const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// API endpoint to get weather data for all cities
app.get('/api/weather', async (req, res) => {
    const cities = [
        { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
        { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
        { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
        { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
        { name: 'Bangkok', lat: 13.7563, lon: 100.5018 }
    ];

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY || 'demo'; // Use 'demo' for testing
        const weatherPromises = cities.map(city => 
            axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    lat: city.lat,
                    lon: city.lon,
                    appid: apiKey,
                    units: 'metric'
                }
            }).then(response => ({
                city: city.name,
                temperature: Math.round(response.data.main.temp),
                feelsLike: Math.round(response.data.main.feels_like),
                humidity: response.data.main.humidity,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
                windSpeed: response.data.wind.speed,
                pressure: response.data.main.pressure
            })).catch(error => ({
                city: city.name,
                error: 'Unable to fetch weather data'
            }))
        );

        const weatherData = await Promise.all(weatherPromises);
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
