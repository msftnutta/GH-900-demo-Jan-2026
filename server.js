const express = require('express');
const axios = require('axios');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import calendar functions
const { checkHolidaysForCities, getPublicHoliday } = require('./public/calendar.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting configuration
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Rate limiting for file system routes (more restrictive)
const fileLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Serve static files with rate limiting
app.use(express.static('public'));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Helper function to map Azure Maps weather icon codes to OpenWeatherMap-style icons
function mapAzureMapsIcon(iconCode, isDayTime = true) {
    const iconMap = {
        1: '01d',  // Sunny / Clear
        2: '02d',  // Mostly Sunny / Mostly Clear
        3: '02d',  // Partly Sunny / Partly Cloudy
        4: '03d',  // Intermittent Clouds
        5: '03d',  // Hazy Sunshine
        6: '04d',  // Mostly Cloudy
        7: '04d',  // Cloudy
        8: '04d',  // Dreary (Overcast)
        11: '50d', // Fog
        12: '10d', // Showers
        13: '10d', // Mostly Cloudy w/ Showers
        14: '10d', // Partly Sunny w/ Showers
        15: '11d', // T-Storms
        16: '11d', // Mostly Cloudy w/ T-Storms
        17: '11d', // Partly Sunny w/ T-Storms
        18: '09d', // Rain
        19: '13d', // Flurries
        20: '13d', // Mostly Cloudy w/ Flurries
        21: '13d', // Partly Sunny w/ Flurries
        22: '13d', // Snow
        23: '13d', // Mostly Cloudy w/ Snow
        24: '13d', // Ice
        25: '13d', // Sleet
        26: '13d', // Freezing Rain
        29: '13d', // Rain and Snow
        30: '01d', // Hot
        31: '01d', // Cold
        32: '50d', // Windy
    };
    
    let icon = iconMap[iconCode] || '02d';
    // Replace 'd' with 'n' for night time
    if (!isDayTime) {
        icon = icon.replace('d', 'n');
    }
    return icon;
}

// API endpoint to get weather data for all cities using Azure Maps
app.get('/api/weather', async (req, res) => {
    const cities = [
        { name: 'Singapore', lat: 1.3521, lon: 103.8198, timezone: 'Asia/Singapore' },
        { name: 'Bangalore', lat: 12.9716, lon: 77.5946, timezone: 'Asia/Kolkata' },
        { name: 'Mumbai', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata' },
        { name: 'Sydney', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney' },
        { name: 'Bangkok', lat: 13.7563, lon: 100.5018, timezone: 'Asia/Bangkok' }
    ];

    const subscriptionKey = process.env.AZURE_MAPS_SUBSCRIPTION_KEY;

    // Check if API key is configured
    if (!subscriptionKey) {
        console.log('No valid Azure Maps subscription key found. Using mock data.');
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
                // Azure Maps Weather API - Current Conditions
                const response = await axios.get('https://atlas.microsoft.com/weather/currentConditions/json', {
                    params: {
                        'api-version': '1.1',
                        'query': `${city.lat},${city.lon}`,
                        'subscription-key': subscriptionKey
                    },
                    timeout: 10000 // 10 second timeout
                });

                const weatherData = response.data.results[0];
                
                return {
                    city: city.name,
                    temperature: Math.round(weatherData.temperature.value),
                    feelsLike: Math.round(weatherData.realFeelTemperature.value),
                    humidity: weatherData.relativeHumidity,
                    description: weatherData.phrase.toLowerCase(),
                    icon: mapAzureMapsIcon(weatherData.iconCode, weatherData.isDayTime),
                    windSpeed: (weatherData.wind.speed.value * 0.277778).toFixed(1), // Convert km/h to m/s
                    pressure: Math.round(weatherData.pressure.value),
                    isMockData: false
                };
            } catch (error) {
                console.error(`Error fetching weather for ${city.name}:`, error.response?.data?.error?.message || error.message);
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
                    error: error.response?.data?.error?.message || 'Using sample data'
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

// API endpoint to check today's public holidays
app.get('/api/holidays/today', (req, res) => {
    const cities = ['Singapore', 'Bangalore', 'Mumbai', 'Sydney', 'Bangkok'];
    const todayHolidays = checkHolidaysForCities(cities);
    
    res.json({
        date: new Date().toISOString().split('T')[0],
        hasHoliday: todayHolidays.length > 0,
        holidays: todayHolidays
    });
});

// API endpoint to check if a specific city has a holiday today
app.get('/api/holidays/city/:cityName', (req, res) => {
    const city = req.params.cityName;
    const holiday = getPublicHoliday(city);
    
    if (holiday) {
        res.json({
            city: city,
            isHoliday: true,
            holidayName: holiday.name,
            date: holiday.date
        });
    } else {
        res.json({
            city: city,
            isHoliday: false,
            message: 'No public holiday today'
        });
    }
});

// Serve the main HTML file with rate limiting
app.get('/', fileLimiter, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
