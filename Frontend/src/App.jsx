import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import WeatherInfo from './pages/WeatherInfo'
import CommunityPosts from './pages/CommunityPosts'
import EmergencyHotlines from './pages/EmergencyHotlines'
import HazardMap from './pages/HazardMap'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <>
                <Header />
                <main className="container mx-auto py-4 md:py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/weather" element={<WeatherInfo />} />
                    <Route path="/community" element={<CommunityPosts />} />
                    <Route path="/emergency" element={<EmergencyHotlines />} />
                    <Route path="/hazard-map" element={<HazardMap />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
