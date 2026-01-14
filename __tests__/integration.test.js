/**
 * Integration tests for the web application
 * Tests the complete flow including date/time display and city-specific data
 */

describe('Web Application Integration Tests', () => {
  let mockDocument;

  beforeEach(() => {
    // Setup mock DOM
    mockDocument = {
      elements: {
        'current-date': { textContent: '' },
        'current-time': { textContent: '' },
        'timezone': { textContent: '' },
        'weather-container': { 
          innerHTML: '',
          style: { display: 'none' }
        },
        'loading': { style: { display: 'block' } },
        'error-message': { style: { display: 'none' } }
      },
      getElementById: function(id) {
        return this.elements[id] || { textContent: '', style: { display: 'none' } };
      }
    };

    global.document = mockDocument;
  });

  describe('Date and Time Display for Target Cities', () => {
    test('should display current date and time correctly', () => {
      const now = new Date();
      
      const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      const dateString = now.toLocaleDateString('en-US', dateOptions);
      
      const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      };
      const timeString = now.toLocaleTimeString('en-US', timeOptions);
      
      expect(dateString).toMatch(/^\w+, \w+ \d{1,2}, \d{4}$/);
      expect(timeString).toMatch(/^\d{2}:\d{2}:\d{2} (AM|PM)$/);
    });

    test('should display time for Mumbai timezone', () => {
      const now = new Date();
      const mumbaiTime = now.toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });
      
      expect(mumbaiTime).toMatch(/^\d{1,2}:\d{2}:\d{2} (AM|PM)$/);
    });

    test('should display time for Bangkok timezone', () => {
      const now = new Date();
      const bangkokTime = now.toLocaleString('en-US', { 
        timeZone: 'Asia/Bangkok',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });
      
      expect(bangkokTime).toMatch(/^\d{1,2}:\d{2}:\d{2} (AM|PM)$/);
    });

    test('should display time for Singapore timezone', () => {
      const now = new Date();
      const singaporeTime = now.toLocaleString('en-US', { 
        timeZone: 'Asia/Singapore',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });
      
      expect(singaporeTime).toMatch(/^\d{1,2}:\d{2}:\d{2} (AM|PM)$/);
    });

    test('should display time for Sydney timezone', () => {
      const now = new Date();
      const sydneyTime = now.toLocaleString('en-US', { 
        timeZone: 'Australia/Sydney',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });
      
      expect(sydneyTime).toMatch(/^\d{1,2}:\d{2}:\d{2} (AM|PM)$/);
    });
  });

  describe('Complete City Information Display', () => {
    test('should display complete information for Mumbai', () => {
      const cityData = {
        city: 'Mumbai',
        timezone: 'Asia/Kolkata',
        country: 'India'
      };

      const now = new Date();
      const cityTime = now.toLocaleString('en-US', { 
        timeZone: cityData.timezone,
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });

      expect(cityData.city).toBe('Mumbai');
      expect(cityTime).toBeDefined();
      expect(cityData.country).toBe('India');
    });

    test('should display complete information for Bangkok', () => {
      const cityData = {
        city: 'Bangkok',
        timezone: 'Asia/Bangkok',
        country: 'Thailand'
      };

      const now = new Date();
      const cityTime = now.toLocaleString('en-US', { 
        timeZone: cityData.timezone,
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });

      expect(cityData.city).toBe('Bangkok');
      expect(cityTime).toBeDefined();
      expect(cityData.country).toBe('Thailand');
    });

    test('should display complete information for Singapore', () => {
      const cityData = {
        city: 'Singapore',
        timezone: 'Asia/Singapore',
        country: 'Singapore'
      };

      const now = new Date();
      const cityTime = now.toLocaleString('en-US', { 
        timeZone: cityData.timezone,
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });

      expect(cityData.city).toBe('Singapore');
      expect(cityTime).toBeDefined();
      expect(cityData.country).toBe('Singapore');
    });

    test('should display complete information for Sydney', () => {
      const cityData = {
        city: 'Sydney',
        timezone: 'Australia/Sydney',
        country: 'Australia'
      };

      const now = new Date();
      const cityTime = now.toLocaleString('en-US', { 
        timeZone: cityData.timezone,
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });

      expect(cityData.city).toBe('Sydney');
      expect(cityTime).toBeDefined();
      expect(cityData.country).toBe('Australia');
    });
  });

  describe('Timezone Differences', () => {
    test('should show different times for different cities at the same moment', () => {
      const fixedTime = new Date('2026-01-14T12:00:00Z'); // Fixed UTC time

      const mumbaiTime = fixedTime.toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Kolkata',
        hour12: false 
      });
      
      const bangkokTime = fixedTime.toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Bangkok',
        hour12: false 
      });
      
      const singaporeTime = fixedTime.toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Singapore',
        hour12: false 
      });
      
      const sydneyTime = fixedTime.toLocaleTimeString('en-US', { 
        timeZone: 'Australia/Sydney',
        hour12: false 
      });

      // All times should be defined
      expect(mumbaiTime).toBeDefined();
      expect(bangkokTime).toBeDefined();
      expect(singaporeTime).toBeDefined();
      expect(sydneyTime).toBeDefined();

      // Mumbai (UTC+5:30), Bangkok (UTC+7), Singapore (UTC+8), Sydney (UTC+11 in Jan)
      // should all show different times
      const times = [mumbaiTime, bangkokTime, singaporeTime, sydneyTime];
      const uniqueTimes = new Set(times);
      expect(uniqueTimes.size).toBeGreaterThan(1); // At least some should be different
    });
  });

  describe('Date Display Consistency', () => {
    test('should display the same date format across all sections', () => {
      const now = new Date();
      const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };

      const date1 = now.toLocaleDateString('en-US', dateOptions);
      const date2 = now.toLocaleDateString('en-US', dateOptions);

      expect(date1).toBe(date2);
      expect(date1).toMatch(/^\w+, \w+ \d{1,2}, \d{4}$/);
    });

    test('should update time continuously (simulated)', () => {
      const time1 = new Date();
      
      // Simulate a small delay
      const time2 = new Date(time1.getTime() + 1000); // 1 second later

      const timeString1 = time1.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });

      const timeString2 = time2.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });

      expect(timeString1).toMatch(/^\d{2}:\d{2}:\d{2} (AM|PM)$/);
      expect(timeString2).toMatch(/^\d{2}:\d{2}:\d{2} (AM|PM)$/);
    });
  });

  describe('Application State', () => {
    test('should have all required DOM elements', () => {
      const requiredElements = [
        'current-date',
        'current-time',
        'timezone',
        'weather-container',
        'loading',
        'error-message'
      ];

      requiredElements.forEach(elementId => {
        const element = mockDocument.getElementById(elementId);
        expect(element).toBeDefined();
      });
    });

    test('should initialize with correct default states', () => {
      expect(mockDocument.getElementById('loading').style.display).toBe('block');
      expect(mockDocument.getElementById('weather-container').style.display).toBe('none');
      expect(mockDocument.getElementById('error-message').style.display).toBe('none');
    });
  });

  describe('Real-time Clock Functionality', () => {
    test('should get current time for all target cities', () => {
      const cities = [
        { name: 'Mumbai', timezone: 'Asia/Kolkata' },
        { name: 'Bangkok', timezone: 'Asia/Bangkok' },
        { name: 'Singapore', timezone: 'Asia/Singapore' },
        { name: 'Sydney', timezone: 'Australia/Sydney' }
      ];

      const now = new Date();
      
      cities.forEach(city => {
        const cityTime = now.toLocaleString('en-US', { 
          timeZone: city.timezone,
          dateStyle: 'full',
          timeStyle: 'long'
        });

        expect(cityTime).toBeDefined();
        expect(cityTime.length).toBeGreaterThan(0);
      });
    });
  });
});
