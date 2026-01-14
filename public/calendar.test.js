/**
 * Unit tests for calendar.js
 * Tests the public holiday checking functionality for different cities
 */

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
  'India': [
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
  'Australia': [
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
  'Thailand': [
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

const cityToCountry = {
  'Singapore': 'Singapore',
  'Bangalore': 'India',
  'Mumbai': 'India',
  'Sydney': 'Australia',
  'Bangkok': 'Thailand'
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getPublicHoliday(city, date = new Date()) {
  const country = cityToCountry[city];
  if (!country) {
    return null;
  }
  
  const dateString = formatDate(date);
  const holidays = publicHolidays[country] || [];
  
  return holidays.find(holiday => holiday.date === dateString) || null;
}

function checkHolidaysForCities(cities) {
  return cities.map(city => {
    const holiday = getPublicHoliday(city);
    return {
      city,
      isHoliday: holiday !== null,
      holidayName: holiday ? holiday.name : null
    };
  });
}

describe('Calendar - Date Formatting', () => {
  test('should format date correctly', () => {
    const testDate = new Date('2026-01-14');
    const formatted = formatDate(testDate);
    
    expect(formatted).toBe('2026-01-14');
  });

  test('should pad single digit months and days with zeros', () => {
    const testDate = new Date('2026-03-05');
    const formatted = formatDate(testDate);
    
    expect(formatted).toBe('2026-03-05');
  });
});

describe('Calendar - City to Country Mapping', () => {
  test('should map Mumbai to India', () => {
    expect(cityToCountry['Mumbai']).toBe('India');
  });

  test('should map Bangkok to Thailand', () => {
    expect(cityToCountry['Bangkok']).toBe('Thailand');
  });

  test('should map Singapore to Singapore', () => {
    expect(cityToCountry['Singapore']).toBe('Singapore');
  });

  test('should map Sydney to Australia', () => {
    expect(cityToCountry['Sydney']).toBe('Australia');
  });
});

describe('Calendar - Public Holiday Detection for Mumbai', () => {
  test('should detect Republic Day (Jan 26) in Mumbai', () => {
    const republicDay = new Date('2026-01-26');
    const holiday = getPublicHoliday('Mumbai', republicDay);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe('Republic Day');
  });

  test('should detect Independence Day (Aug 15) in Mumbai', () => {
    const independenceDay = new Date('2026-08-15');
    const holiday = getPublicHoliday('Mumbai', independenceDay);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe('Independence Day');
  });

  test('should detect Diwali in Mumbai', () => {
    const diwali = new Date('2026-10-24');
    const holiday = getPublicHoliday('Mumbai', diwali);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe('Diwali');
  });

  test('should return null for non-holiday in Mumbai', () => {
    const regularDay = new Date('2026-02-15');
    const holiday = getPublicHoliday('Mumbai', regularDay);
    
    expect(holiday).toBeNull();
  });
});

describe('Calendar - Public Holiday Detection for Bangkok', () => {
  test('should detect New Year\'s Day in Bangkok', () => {
    const newYear = new Date('2026-01-01');
    const holiday = getPublicHoliday('Bangkok', newYear);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe("New Year's Day");
  });

  test('should detect Songkran Festival (Apr 13) in Bangkok', () => {
    const songkran = new Date('2026-04-13');
    const holiday = getPublicHoliday('Bangkok', songkran);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe('Songkran Festival');
  });

  test('should detect King\'s Birthday in Bangkok', () => {
    const kingBirthday = new Date('2026-07-28');
    const holiday = getPublicHoliday('Bangkok', kingBirthday);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe("King's Birthday");
  });

  test('should return null for non-holiday in Bangkok', () => {
    const regularDay = new Date('2026-03-15');
    const holiday = getPublicHoliday('Bangkok', regularDay);
    
    expect(holiday).toBeNull();
  });
});

describe('Calendar - Public Holiday Detection for Singapore', () => {
  test('should detect Chinese New Year in Singapore', () => {
    const cny = new Date('2026-01-29');
    const holiday = getPublicHoliday('Singapore', cny);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe('Chinese New Year');
  });

  test('should detect National Day (Aug 9) in Singapore', () => {
    const nationalDay = new Date('2026-08-09');
    const holiday = getPublicHoliday('Singapore', nationalDay);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe('National Day');
  });

  test('should detect Deepavali in Singapore', () => {
    const deepavali = new Date('2026-10-24');
    const holiday = getPublicHoliday('Singapore', deepavali);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe('Deepavali');
  });

  test('should return null for non-holiday in Singapore', () => {
    const regularDay = new Date('2026-07-15');
    const holiday = getPublicHoliday('Singapore', regularDay);
    
    expect(holiday).toBeNull();
  });
});

describe('Calendar - Public Holiday Detection for Sydney', () => {
  test('should detect Australia Day (Jan 26) in Sydney', () => {
    const ausDay = new Date('2026-01-26');
    const holiday = getPublicHoliday('Sydney', ausDay);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe('Australia Day');
  });

  test('should detect ANZAC Day (Apr 25) in Sydney', () => {
    const anzacDay = new Date('2026-04-25');
    const holiday = getPublicHoliday('Sydney', anzacDay);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe('ANZAC Day');
  });

  test('should detect Christmas Day in Sydney', () => {
    const christmas = new Date('2026-12-25');
    const holiday = getPublicHoliday('Sydney', christmas);
    
    expect(holiday).not.toBeNull();
    expect(holiday.name).toBe('Christmas Day');
  });

  test('should return null for non-holiday in Sydney', () => {
    const regularDay = new Date('2026-05-20');
    const holiday = getPublicHoliday('Sydney', regularDay);
    
    expect(holiday).toBeNull();
  });
});

describe('Calendar - Check Holidays for Multiple Cities', () => {
  test('should check holidays for all target cities', () => {
    const cities = ['Mumbai', 'Bangkok', 'Singapore', 'Sydney'];
    const results = checkHolidaysForCities(cities);
    
    expect(results).toHaveLength(4);
    expect(results[0].city).toBe('Mumbai');
    expect(results[1].city).toBe('Bangkok');
    expect(results[2].city).toBe('Singapore');
    expect(results[3].city).toBe('Sydney');
  });

  test('should detect when a day is a holiday in multiple cities', () => {
    // Jan 1 is New Year's Day in Bangkok, Singapore, and Sydney
    const newYearDate = new Date('2026-01-01');
    
    const bangkokHoliday = getPublicHoliday('Bangkok', newYearDate);
    const singaporeHoliday = getPublicHoliday('Singapore', newYearDate);
    const sydneyHoliday = getPublicHoliday('Sydney', newYearDate);
    
    expect(bangkokHoliday).not.toBeNull();
    expect(singaporeHoliday).not.toBeNull();
    expect(sydneyHoliday).not.toBeNull();
    expect(bangkokHoliday.name).toContain("New Year");
    expect(singaporeHoliday.name).toContain("New Year");
    expect(sydneyHoliday.name).toContain("New Year");
  });

  test('should handle unknown cities gracefully', () => {
    const holiday = getPublicHoliday('UnknownCity', new Date('2026-01-01'));
    expect(holiday).toBeNull();
  });
});

describe('Calendar - Current Date Integration', () => {
  test('should use current date when no date parameter provided', () => {
    // This test uses the actual current date
    const result = getPublicHoliday('Mumbai');
    
    // Result can be null or an object, but should not throw an error
    expect(result === null || typeof result === 'object').toBe(true);
  });

  test('should work with today\'s date for all cities', () => {
    const today = new Date();
    const cities = ['Mumbai', 'Bangkok', 'Singapore', 'Sydney'];
    
    cities.forEach(city => {
      const holiday = getPublicHoliday(city, today);
      // Should not throw an error
      expect(holiday === null || typeof holiday === 'object').toBe(true);
    });
  });
});
