// Public holidays data for different countries/cities
const publicHolidays = {
    'Singapore': [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-01-29', name: 'Chinese New Year' },
        { date: '2026-01-30', name: 'Chinese New Year' },
        { date: '2026-04-03', name: 'Good Friday' },
        { date: '2026-05-01', name: 'Labour Day' },
        { date: '2026-05-21', name: 'Vesak Day' },
        { date: '2026-08-09', name: 'National Day' },
        { date: '2026-10-24', name: 'Deepavali' },
        { date: '2026-12-25', name: 'Christmas Day' }
    ],
    'India': [ // For Bangalore and Mumbai
        { date: '2026-01-26', name: 'Republic Day' },
        { date: '2026-03-14', name: 'Holi' },
        { date: '2026-04-02', name: 'Good Friday' },
        { date: '2026-04-06', name: 'Mahavir Jayanti' },
        { date: '2026-05-01', name: 'Labour Day' },
        { date: '2026-08-15', name: 'Independence Day' },
        { date: '2026-10-02', name: 'Gandhi Jayanti' },
        { date: '2026-10-15', name: 'Dussehra' },
        { date: '2026-10-24', name: 'Diwali' },
        { date: '2026-11-14', name: "Guru Nanak's Birthday" },
        { date: '2026-12-25', name: 'Christmas Day' }
    ],
    'Australia': [ // For Sydney
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-01-26', name: 'Australia Day' },
        { date: '2026-04-03', name: 'Good Friday' },
        { date: '2026-04-04', name: 'Saturday before Easter Sunday' },
        { date: '2026-04-06', name: 'Easter Monday' },
        { date: '2026-04-25', name: 'ANZAC Day' },
        { date: '2026-06-08', name: "Queen's Birthday" },
        { date: '2026-12-25', name: 'Christmas Day' },
        { date: '2026-12-26', name: 'Boxing Day' }
    ],
    'Thailand': [ // For Bangkok
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-02-16', name: 'Makha Bucha Day' },
        { date: '2026-04-06', name: 'Chakri Memorial Day' },
        { date: '2026-04-13', name: 'Songkran Festival' },
        { date: '2026-04-14', name: 'Songkran Festival' },
        { date: '2026-04-15', name: 'Songkran Festival' },
        { date: '2026-05-01', name: 'Labour Day' },
        { date: '2026-05-04', name: 'Coronation Day' },
        { date: '2026-05-15', name: 'Visakha Bucha Day' },
        { date: '2026-07-28', name: "King's Birthday" },
        { date: '2026-08-12', name: "Queen Mother's Birthday" },
        { date: '2026-10-13', name: 'King Bhumibol Memorial Day' },
        { date: '2026-10-23', name: 'Chulalongkorn Day' },
        { date: '2026-12-05', name: "King's Birthday" },
        { date: '2026-12-10', name: 'Constitution Day' },
        { date: '2026-12-31', name: "New Year's Eve" }
    ]
};

// Map cities to countries
const cityToCountry = {
    'Singapore': 'Singapore',
    'Bangalore': 'India',
    'Mumbai': 'India',
    'Sydney': 'Australia',
    'Bangkok': 'Thailand'
};

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Check if a specific date is a public holiday in a given city
 * @param {string} city - The city name
 * @param {Date} date - The date to check (defaults to today)
 * @returns {Object|null} Holiday object if it's a holiday, null otherwise
 */
function getPublicHoliday(city, date = new Date()) {
    const country = cityToCountry[city];
    if (!country) {
        return null;
    }
    
    const dateString = formatDate(date);
    const holidays = publicHolidays[country] || [];
    
    return holidays.find(holiday => holiday.date === dateString) || null;
}

/**
 * Check if today is a public holiday in any of the listed cities
 * @param {Array<string>} cities - Array of city names
 * @returns {Array<Object>} Array of objects containing city and holiday information
 */
function checkHolidaysForCities(cities) {
    const today = new Date();
    const holidays = [];
    
    cities.forEach(city => {
        const holiday = getPublicHoliday(city, today);
        if (holiday) {
            holidays.push({
                city: city,
                holidayName: holiday.name,
                date: holiday.date
            });
        }
    });
    
    return holidays;
}

/**
 * Get all public holidays for a city in a given year
 * @param {string} city - The city name
 * @param {number} year - The year (defaults to current year)
 * @returns {Array<Object>} Array of holiday objects
 */
function getYearHolidays(city, year = new Date().getFullYear()) {
    const country = cityToCountry[city];
    if (!country) {
        return [];
    }
    
    const holidays = publicHolidays[country] || [];
    return holidays.filter(holiday => holiday.date.startsWith(String(year)));
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getPublicHoliday,
        checkHolidaysForCities,
        getYearHolidays,
        formatDate,
        publicHolidays,
        cityToCountry
    };
}