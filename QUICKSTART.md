# Quick Start Guide - Weather Dashboard

## Setup in 3 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Your Free API Key

1. Go to https://openweathermap.org/api
2. Click "Sign Up" (it's free!)
3. Verify your email
4. Go to "API Keys" tab
5. Copy your API key

### 3. Configure Environment

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit `.env` file and replace `your_api_key_here` with your actual API key:
```
OPENWEATHER_API_KEY=abc123your_actual_key_here
```

### 4. Run the Application

```bash
npm start
```

### 5. Open in Browser

Navigate to: **http://localhost:3000**

## What You'll See

✅ Current date and time with your timezone
✅ Weather for 5 cities:
   - Singapore
   - Bangalore, India
   - Mumbai, India
   - Sydney, Australia
   - Bangkok, Thailand

✅ For each city:
   - Current temperature
   - Weather conditions
   - Humidity
   - Wind speed
   - Atmospheric pressure

## Troubleshooting

**Problem**: "Unable to fetch weather data"
- **Solution**: Check your API key in the `.env` file

**Problem**: "Cannot find module 'express'"
- **Solution**: Run `npm install` again

**Problem**: Port 3000 already in use
- **Solution**: Change PORT in `.env` to 3001 or another available port

## Development Mode

For auto-reload during development:
```bash
npm run dev
```

## Stop the Server

Press `Ctrl + C` in the terminal

---

Enjoy your weather dashboard! 🌤️
