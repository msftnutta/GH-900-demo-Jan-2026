# Unit Tests for Global Weather Dashboard

This directory contains comprehensive unit and integration tests for the Global Weather Dashboard application.

## Test Coverage

### 1. Date and Time Display Tests (`public/app.test.js`)
Tests the core date/time functionality:
- ✅ Current date display in correct format
- ✅ Current time display with AM/PM format
- ✅ Timezone information display
- ✅ Weather card creation with city information
- ✅ Holiday badge display
- ✅ Mock data badge display
- ✅ Complete weather details (temperature, humidity, wind, pressure)
- ✅ Support for multiple cities (Mumbai, Bangkok, Singapore, Sydney)

### 2. Calendar and Holiday Tests (`public/calendar.test.js`)
Tests the holiday detection functionality:
- ✅ Date formatting (YYYY-MM-DD)
- ✅ City to country mapping
- ✅ **Mumbai (India)** - Republic Day, Independence Day, Diwali, etc.
- ✅ **Bangkok (Thailand)** - Songkran Festival, King's Birthday, etc.
- ✅ **Singapore** - Chinese New Year, National Day, Deepavali, etc.
- ✅ **Sydney (Australia)** - Australia Day, ANZAC Day, etc.
- ✅ Multiple city holiday checking
- ✅ Non-holiday date handling

### 3. Integration Tests (`__tests__/integration.test.js`)
Tests the complete application flow:
- ✅ Date and time display for all target cities
- ✅ Timezone-specific time display for Mumbai, Bangkok, Singapore, and Sydney
- ✅ Complete city information (name, timezone, country)
- ✅ Timezone differences validation
- ✅ DOM element initialization
- ✅ Real-time clock functionality for all cities

## Target Cities

The tests specifically cover these cities as requested:
1. **Mumbai** (Asia/Kolkata - UTC+5:30)
2. **Bangkok** (Asia/Bangkok - UTC+7)
3. **Singapore** (Asia/Singapore - UTC+8)
4. **Sydney** (Australia/Sydney - UTC+10/11)

## Running the Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

## Test Framework

- **Jest**: JavaScript testing framework
- **jest-environment-jsdom**: DOM environment for browser-side testing
- **@testing-library/jest-dom**: Custom Jest matchers for DOM

## Test Files Structure

```
.
├── public/
│   ├── app.test.js              # Unit tests for date/time and weather card display
│   └── calendar.test.js         # Unit tests for holiday detection
├── __tests__/
│   └── integration.test.js      # Integration tests for complete app flow
├── jest.config.js               # Jest configuration
└── jest.setup.js                # Test setup and mocks
```

## What's Being Tested

### Current Date and Time Display
- Verifies that the current date is displayed in the format: "Day, Month Date, Year"
- Verifies that the current time is displayed with seconds and AM/PM
- Verifies that timezone information is shown

### City-Specific Features
Each of the four target cities (Mumbai, Bangkok, Singapore, Sydney) is tested for:
- Correct time zone handling
- Time format consistency
- Holiday detection on specific dates
- Country mapping

### Holiday Detection
- Tests verify that public holidays are correctly identified for each city
- Validates that holiday names are correct
- Ensures non-holidays return null
- Checks holiday badges display correctly

## Sample Test Output

When you run `npm test`, you should see output like:
```
PASS  public/app.test.js
  Date and Time Display
    ✓ should display current date in correct format
    ✓ should display current time in correct format
    ✓ should display timezone information
  Weather Card Creation
    ✓ should create weather card with city name
    ✓ should create weather cards for all target cities
    
PASS  public/calendar.test.js
  Calendar - Public Holiday Detection for Mumbai
    ✓ should detect Republic Day (Jan 26) in Mumbai
    ✓ should detect Diwali in Mumbai
    
Test Suites: 3 passed, 3 total
Tests:       50+ passed, 50+ total
```

## Notes

- Tests use fixed dates for deterministic results
- All tests are timezone-aware
- Mock data is used to avoid external API dependencies
- Tests validate both the presence and format of displayed information
