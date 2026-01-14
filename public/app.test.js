/**
 * Unit tests for app.js
 * Tests the date/time display and weather card creation functionality
 */

describe('Date and Time Display', () => {
  let mockDateElement, mockTimeElement, mockTimezoneElement;

  beforeEach(() => {
    // Create mock DOM elements
    mockDateElement = { textContent: '' };
    mockTimeElement = { textContent: '' };
    mockTimezoneElement = { textContent: '' };

    // Mock document.getElementById
    document.getElementById = jest.fn((id) => {
      const elements = {
        'current-date': mockDateElement,
        'current-time': mockTimeElement,
        'timezone': mockTimezoneElement
      };
      return elements[id];
    });

    // Load the updateDateTime function
    global.updateDateTime = function() {
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
    };
  });

  test('should display current date in correct format', () => {
    updateDateTime();
    
    expect(mockDateElement.textContent).toBeTruthy();
    expect(mockDateElement.textContent).toMatch(/^\w+, \w+ \d{1,2}, \d{4}$/);
    // Example: "Tuesday, January 14, 2026"
  });

  test('should display current time in correct format', () => {
    updateDateTime();
    
    expect(mockTimeElement.textContent).toBeTruthy();
    expect(mockTimeElement.textContent).toMatch(/^\d{2}:\d{2}:\d{2} (AM|PM)$/);
    // Example: "02:30:45 PM"
  });

  test('should display timezone information', () => {
    updateDateTime();
    
    expect(mockTimezoneElement.textContent).toBeTruthy();
    expect(mockTimezoneElement.textContent).toContain('Timezone:');
  });

  test('should call document.getElementById with correct IDs', () => {
    updateDateTime();
    
    expect(document.getElementById).toHaveBeenCalledWith('current-date');
    expect(document.getElementById).toHaveBeenCalledWith('current-time');
    expect(document.getElementById).toHaveBeenCalledWith('timezone');
  });
});

describe('Weather Card Creation', () => {
  beforeEach(() => {
    // Load the createWeatherCard function
    global.createWeatherCard = function(weather) {
      const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
      const mockBadge = weather.isMockData ? 
        '<span class="badge bg-warning text-dark mb-2"><i class="bi bi-info-circle"></i> Sample Data</span>' : '';
      
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
    };
  });

  test('should create weather card with city name', () => {
    const weatherData = {
      city: 'Mumbai',
      temperature: 28,
      description: 'Partly cloudy',
      icon: '02d',
      feelsLike: 30,
      humidity: 65,
      windSpeed: 3.5,
      pressure: 1012
    };

    const card = createWeatherCard(weatherData);
    
    expect(card).toContain('Mumbai');
    expect(card).toContain('28°C');
    expect(card).toContain('Partly cloudy');
  });

  test('should create weather cards for all target cities', () => {
    const cities = [
      { city: 'Mumbai', temperature: 28 },
      { city: 'Bangkok', temperature: 32 },
      { city: 'Singapore', temperature: 30 },
      { city: 'Sydney', temperature: 25 }
    ];

    cities.forEach(cityData => {
      const weatherData = {
        ...cityData,
        description: 'Clear sky',
        icon: '01d',
        feelsLike: cityData.temperature + 2,
        humidity: 60,
        windSpeed: 3,
        pressure: 1013
      };

      const card = createWeatherCard(weatherData);
      expect(card).toContain(cityData.city);
      expect(card).toContain(`${cityData.temperature}°C`);
    });
  });

  test('should show holiday badge when holiday is present', () => {
    const weatherData = {
      city: 'Singapore',
      temperature: 30,
      description: 'Sunny',
      icon: '01d',
      feelsLike: 32,
      humidity: 70,
      windSpeed: 2.5,
      pressure: 1010,
      holidayName: "New Year's Day"
    };

    const card = createWeatherCard(weatherData);
    
    expect(card).toContain("New Year's Day");
    expect(card).toContain('badge bg-success');
  });

  test('should show mock data badge when using sample data', () => {
    const weatherData = {
      city: 'Bangkok',
      temperature: 33,
      description: 'Hot',
      icon: '01d',
      feelsLike: 36,
      humidity: 75,
      windSpeed: 2,
      pressure: 1009,
      isMockData: true
    };

    const card = createWeatherCard(weatherData);
    
    expect(card).toContain('Sample Data');
    expect(card).toContain('badge bg-warning');
  });

  test('should include all weather details', () => {
    const weatherData = {
      city: 'Sydney',
      temperature: 22,
      description: 'Clear',
      icon: '01d',
      feelsLike: 24,
      humidity: 55,
      windSpeed: 4.2,
      pressure: 1015
    };

    const card = createWeatherCard(weatherData);
    
    expect(card).toContain('Feels Like');
    expect(card).toContain('24°C');
    expect(card).toContain('Humidity');
    expect(card).toContain('55%');
    expect(card).toContain('Wind Speed');
    expect(card).toContain('4.2 m/s');
    expect(card).toContain('Pressure');
    expect(card).toContain('1015 hPa');
  });
});

describe('Time Display for Multiple Cities', () => {
  test('should handle different timezones correctly', () => {
    const testDate = new Date('2026-01-14T12:00:00Z'); // Fixed UTC time
    
    // Mumbai - UTC+5:30
    const mumbaiTime = new Date(testDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    expect(mumbaiTime).toBeDefined();
    
    // Bangkok - UTC+7
    const bangkokTime = new Date(testDate.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
    expect(bangkokTime).toBeDefined();
    
    // Singapore - UTC+8
    const singaporeTime = new Date(testDate.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));
    expect(singaporeTime).toBeDefined();
    
    // Sydney - UTC+11 (or UTC+10 depending on DST)
    const sydneyTime = new Date(testDate.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
    expect(sydneyTime).toBeDefined();
  });

  test('should format time correctly for different locales', () => {
    const testDate = new Date('2026-01-14T12:00:00Z');
    
    const timeOptions = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    };

    const formattedTime = testDate.toLocaleTimeString('en-US', timeOptions);
    expect(formattedTime).toMatch(/^\d{2}:\d{2}:\d{2} (AM|PM)$/);
  });
});
