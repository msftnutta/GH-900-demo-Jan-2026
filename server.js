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
        { name: 'Singapore', lat: 1.3521, lon: 103.8198, timezone: 'Asia/Singapore' },
        { name: 'Bangalore', lat: 12.9716, lon: 77.5946, timezone: 'Asia/Kolkata' },
        { name: 'Mumbai', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata' },
        { name: 'Sydney', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney' },
        { name: 'Bangkok', lat: 13.7563, lon: 100.5018, timezone: 'Asia/Bangkok' }
    ];

    const apiKey = process.env.OPENWEATHER_API_KEY;

    // Check if API key is configured
    if (!apiKey || apiKey === 'your_api_key_here') {
        console.log('No valid API key found. Using mock data.');
        // Return mock data for demonstration
        const mockData = cities.map(city => ({
            city: city.name,
            temperature: Math.round(25 + Math.random() * 10),
            feelsLike: Math.round(26 + Math.random() * 10),
            humidity: Math.round(60 + Math.random() * 30),
            description: ['clear sky', 'few clouds', 'scattered clouds', 'partly cloudy'][Math.floor(Math.random() * 4)],
            icon: ['01d', '02d', '03d', '04d'][Math.floor(Math.random() * 4)],
            windSpeed: (Math.random() * 5).toFixed(1),
            pressure: Math.round(1010 + Math.random() * 20),
            isMockData: true
        }));
        return res.json(mockData);
    }

    try {
        const weatherPromises = cities.map(async (city) => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                    params: {
                        lat: city.lat,
                        lon: city.lon,
                        appid: apiKey,
                        units: 'metric'
                    },
                    timeout: 10000 // 10 second timeout
                });

                return {
                    city: city.name,
                    temperature: Math.round(response.data.main.temp),
                    feelsLike: Math.round(response.data.main.feels_like),
                    humidity: response.data.main.humidity,
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon,
                    windSpeed: response.data.wind.speed.toFixed(1),
                    pressure: response.data.main.pressure,
                    isMockData: false
                };
            } catch (error) {
                console.error(`Error fetching weather for ${city.name}:`, error.response?.data?.message || error.message);
                // Return mock data for this specific city if API call fails
                return {
                    city: city.name,
                    temperature: Math.round(25 + Math.random() * 10),
                    feelsLike: Math.round(26 + Math.random() * 10),
                    humidity: Math.round(60 + Math.random() * 30),
                    description: 'partly cloudy',
                    icon: '02d',
                    windSpeed: (Math.random() * 5).toFixed(1),
                    pressure: Math.round(1010 + Math.random() * 20),
                    isMockData: true,
                    error: error.response?.data?.message || 'Using sample data'
                };
            }
        });

        const weatherData = await Promise.all(weatherPromises);
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        // Return mock data as last resort
        const mockData = cities.map(city => ({
            city: city.name,
            temperature: Math.round(25 + Math.random() * 10),
            feelsLike: Math.round(26 + Math.random() * 10),
            humidity: Math.round(60 + Math.random() * 30),
            description: 'partly cloudy',
            icon: '02d',
            windSpeed: (Math.random() * 5).toFixed(1),
            pressure: Math.round(1010 + Math.random() * 20),
            isMockData: true
        }));
        res.json(mockData);
    }
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
