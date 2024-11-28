import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from "./pages/auth/Login";
import { RegisterPage } from "./pages/auth/Register";
import { CartPage } from './pages/cart/CartPage';
import { CourseDetails } from './pages/course/CourseDetails';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/profile/ProfilePage';
function App() {

  return (
    <Router>
      <AuthProvider>
        <main className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/course/:courseId"
                element={
                  <ProtectedRoute>
                    <CourseDetails />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </main>
      </AuthProvider>

    </Router>
  )
}

export default App
