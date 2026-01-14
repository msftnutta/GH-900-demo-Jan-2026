# Quick Test Reference

## Running Tests

```bash
# Install dependencies first (if not already done)
npm install

# Run all tests
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

## Test Files Location

```
GH-900-demo-Jan-2026/
├── public/
│   ├── app.test.js          ← Tests for date/time display
│   └── calendar.test.js     ← Tests for holiday detection
├── __tests__/
│   └── integration.test.js  ← Integration tests
├── jest.config.js           ← Jest configuration
└── jest.setup.js            ← Test setup
```

## What's Tested

### ✅ Date & Time Display
- Current date in "Day, Month Date, Year" format
- Current time with seconds and AM/PM
- Timezone information

### ✅ All 4 Cities (Mumbai, Bangkok, Singapore, Sydney)
- Correct timezone handling
- Time format for each city
- Public holiday detection
- Country mapping

### ✅ Weather Cards
- City name display
- Temperature and weather details
- Holiday badges
- Mock data indicators

### ✅ Public Holidays Tested

**Mumbai (India)**
- Republic Day (Jan 26)
- Independence Day (Aug 15)
- Diwali (Oct 24)

**Bangkok (Thailand)**
- New Year's Day (Jan 1)
- Songkran Festival (Apr 13)
- King's Birthday (Jul 28)

**Singapore**
- Chinese New Year (Jan 29)
- National Day (Aug 9)
- Deepavali (Oct 24)

**Sydney (Australia)**
- Australia Day (Jan 26)
- ANZAC Day (Apr 25)
- Christmas Day (Dec 25)

## Test Results

All 53 tests passing ✅
- Integration tests: 15 passed
- App.js tests: 11 passed
- Calendar tests: 27 passed

## Documentation

- `TEST_README.md` - Detailed test documentation
- `TEST_SUMMARY.md` - Complete test results summary
- `QUICK_REFERENCE.md` - This file
