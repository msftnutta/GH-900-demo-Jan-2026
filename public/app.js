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
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    const mockBadge = weather.isMockData ? 
        '<span class="badge bg-warning text-dark mb-2"><i class="bi bi-info-circle"></i> Sample Data</span>' : '';
    
    // Check if this city has a holiday badge
    const holidayBadge = weather.holidayName ? 
        `<span class="badge bg-success text-white mb-2"><i class="bi bi-calendar-event"></i> ${weather.holidayName}</span>` : '';
    
    return `
        <div class="col-md-6 col-lg-4">
            <div class="card weather-card shadow-sm">
                <div class="card-body text-center">
                    <h5 class="city-name">
                        <i class="bi bi-geo-alt-fill text-danger"></i>
                        ${weather.city}
                    </h5>
                    ${mockBadge}
                    ${holidayBadge}
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
        
        // Fetch weather data
        const weatherResponse = await fetch('/api/weather');
        
        if (!weatherResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        const weatherData = await weatherResponse.json();
        
        // Fetch holiday data
        let holidayData = { holidays: [] };
        try {
            const holidayResponse = await fetch('/api/holidays/today');
            if (holidayResponse.ok) {
                holidayData = await holidayResponse.json();
            }
        } catch (err) {
            console.warn('Could not fetch holiday data:', err);
        }
        
        // Merge holiday information with weather data
        const enrichedWeatherData = weatherData.map(weather => {
            const cityHoliday = holidayData.holidays.find(h => h.city === weather.city);
            return {
                ...weather,
                holidayName: cityHoliday ? cityHoliday.holidayName : null
            };
        });
        
        // Create weather cards
        const weatherHTML = enrichedWeatherData.map(weather => createWeatherCard(weather)).join('');
        weatherContainer.innerHTML = weatherHTML;
        
        // Show weather container
        loadingElement.style.display = 'none';
        weatherContainer.style.display = 'flex';
        
        // Display holiday notification if there are any holidays today
        if (holidayData.hasHoliday) {
            displayHolidayNotification(holidayData.holidays);
        }
        
    } catch (error) {
        console.error('Error:', error);
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        document.getElementById('error-text').textContent = 
            'Unable to connect to weather service. Please check your internet connection.';
    }
}

// Display holiday notification
function displayHolidayNotification(holidays) {
    // Remove any existing notification
    const existingNotification = document.getElementById('holiday-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'holiday-notification';
    notification.className = 'alert alert-info alert-dismissible fade show';
    notification.setAttribute('role', 'alert');
    
    const holidayList = holidays.map(h => `<strong>${h.city}</strong>: ${h.holidayName}`).join('<br>');
    
    notification.innerHTML = `
        <h5 class="alert-heading">
            <i class="bi bi-calendar-check-fill me-2"></i>
            Public Holiday Alert!
        </h5>
        <p class="mb-0">Today is a public holiday in:</p>
        <p class="mb-0 mt-2">${holidayList}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insert notification before the weather section
    const container = document.querySelector('.container.my-5');
    const weatherSection = document.querySelector('.row.mb-4:nth-of-type(2)');
    container.insertBefore(notification, weatherSection);
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
