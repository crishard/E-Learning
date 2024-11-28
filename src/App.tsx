import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LoginPage } from "./pages/auth/Login";
import { RegisterPage } from "./pages/auth/Register";
import { HomePage } from './pages/HomePage';
function App() {

  return (
    <Router>
        <div className="min-h-screen bg-gray-50">
        <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-8">
            <Routes>
            <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
    </Router>
  )
}

export default App
