// Update date and time
function updateDateTime() {
    const now = new Date();
    
    // Format date
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('en-US', dateOptions);
    document.getElementById('current-date').textContent = dateString;
    
    // Format time
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    };
    const timeString = now.toLocaleTimeString('en-US', timeOptions);
    document.getElementById('current-time').textContent = timeString;
    
    // Display timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('timezone').textContent = `Timezone: ${timezone}`;
}

// Create weather card HTML
function createWeatherCard(weather) {
    if (weather.error) {
        return `
            <div class="col-md-6 col-lg-4">
                <div class="card weather-card shadow-sm">
                    <div class="card-body text-center">
                        <h5 class="city-name">${weather.city}</h5>
                        <p class="text-danger">${weather.error}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    
    return `
        <div class="col-md-6 col-lg-4">
            <div class="card weather-card shadow-sm">
                <div class="card-body text-center">
                    <h5 class="city-name">
                        <i class="bi bi-geo-alt-fill text-danger"></i>
                        ${weather.city}
                    </h5>
                    <img src="${iconUrl}" alt="${weather.description}" class="weather-icon">
                    <div class="temperature">${weather.temperature}°C</div>
                    <p class="weather-description">${weather.description}</p>
                    
                    <div class="weather-details">
                        <div class="weather-detail-item">
                            <span class="detail-label">
                                <i class="bi bi-thermometer-half text-primary"></i>
                                Feels Like
                            </span>
                            <span class="detail-value">${weather.feelsLike}°C</span>
                        </div>
                        <div class="weather-detail-item">
                            <span class="detail-label">
                                <i class="bi bi-droplet-fill text-info"></i>
                                Humidity
                            </span>
                            <span class="detail-value">${weather.humidity}%</span>
                        </div>
                        <div class="weather-detail-item">
                            <span class="detail-label">
                                <i class="bi bi-wind text-success"></i>
                                Wind Speed
                            </span>
                            <span class="detail-value">${weather.windSpeed} m/s</span>
                        </div>
                        <div class="weather-detail-item">
                            <span class="detail-label">
                                <i class="bi bi-speedometer2 text-warning"></i>
                                Pressure
                            </span>
                            <span class="detail-value">${weather.pressure} hPa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fetch weather data
async function fetchWeather() {
    const loadingElement = document.getElementById('loading');
    const weatherContainer = document.getElementById('weather-container');
    const errorElement = document.getElementById('error-message');
    
    try {
        loadingElement.style.display = 'block';
        weatherContainer.style.display = 'none';
        errorElement.style.display = 'none';
        
        const response = await fetch('/api/weather');
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        const weatherData = await response.json();
        
        // Create weather cards
        const weatherHTML = weatherData.map(weather => createWeatherCard(weather)).join('');
        weatherContainer.innerHTML = weatherHTML;
        
        // Show weather container
        loadingElement.style.display = 'none';
        weatherContainer.style.display = 'flex';
        
    } catch (error) {
        console.error('Error:', error);
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        document.getElementById('error-text').textContent = 
            'Unable to fetch weather data. Please check your API key configuration.';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Update date and time immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Fetch weather data immediately and then every 10 minutes
    fetchWeather();
    setInterval(fetchWeather, 600000); // 10 minutes
});
