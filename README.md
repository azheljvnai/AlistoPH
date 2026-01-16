# AlistoPH - Disaster Awareness Web App

A static React.js web application for disaster awareness in the Philippines. This app provides real-time disaster alerts, weather information, community posts, emergency hotlines, evacuation centers, and an interactive hazard map.

## Features

1. **Home Page** - Disaster alerts feed with filtering by type and severity
2. **Weather Info Page** - Current weather conditions, temperature, heat index, and air quality
3. **Community Posts Page** - User-generated posts with search functionality
4. **Emergency Hotlines & Evacuation Centers** - Searchable directory of emergency contacts and evacuation centers
5. **Hazard Map** - Interactive map showing fault lines and flood-prone areas using Leaflet.js

## Project Structure

```
AlistoPH/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── WeatherInfo.jsx
│   │   │   ├── CommunityPosts.jsx
│   │   │   ├── EmergencyHotlines.jsx
│   │   │   └── HazardMap.jsx
│   │   ├── data/
│   │   │   ├── mockAlerts.js
│   │   │   ├── mockWeather.js
│   │   │   ├── mockPosts.js
│   │   │   └── mockLocations.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.html
└── Backend/
    └── (Future backend implementation)
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- **React.js** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling and responsive design
- **Leaflet.js** - Interactive maps
- **Vite** - Build tool and development server

## Features in Detail

### Home Page
- Displays disaster alerts with date, type, severity, and description
- Filter alerts by type (Typhoon, Flood, Earthquake, etc.)
- Filter alerts by severity (High, Medium, Low)
- Search functionality for alerts

### Weather Info Page
- Current temperature and heat index
- Air quality index with color-coded indicators
- Humidity and wind speed
- Weather condition summary

### Community Posts Page
- Feed of community posts with user names and timestamps
- Search posts by user, message, or location
- Clean, social media-like interface

### Emergency Hotlines & Evacuation Centers
- Searchable directory of emergency contacts
- Filter by location and type (Hotline/Evacuation Center)
- Display phone numbers, addresses, and coordinates
- Clickable phone numbers for easy dialing

### Hazard Map
- Interactive map centered on Metro Manila
- Markers for fault lines (red) and flood-prone areas (blue)
- Click markers to see detailed information
- Legend and information panels

## Data

All data is currently static and stored in mock JSON files in the `src/data` directory. This allows for easy testing and development without a backend.

## Future Enhancements

- Backend API integration
- Real-time data updates
- User authentication
- Post creation functionality
- Push notifications for alerts
- More detailed map features

## License

This project is open source and available for educational purposes.
