# Weather Dashboard

A Next.js application that displays real-time weather information and forecasts for the Better Developers.
Using OpenWeather API, Shadcn UI, TailwindCSS and TypeScript.

## Features

- Real-time weather data display
- Current conditions including:
  - Temperature
  - Weather conditions
  - Humidity
  - Wind speed
- 5-day weather forecast (OpenWeather API does not support 7-day forecasts for free tier)
- Responsive design for desktop and mobile viewing

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
OPEN_WEATHER_API_KEY=your_api_key_here
```
