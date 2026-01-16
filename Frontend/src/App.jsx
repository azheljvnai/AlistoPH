import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import WeatherInfo from './pages/WeatherInfo'
import CommunityPosts from './pages/CommunityPosts'
import EmergencyHotlines from './pages/EmergencyHotlines'
import HazardMap from './pages/HazardMap'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto py-4 md:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<WeatherInfo />} />
            <Route path="/community" element={<CommunityPosts />} />
            <Route path="/emergency" element={<EmergencyHotlines />} />
            <Route path="/hazard-map" element={<HazardMap />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
