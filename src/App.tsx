import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LocationLogger } from './components/LocationLogger.tsx';
import { Navbar } from './components/Navbar';
import { LoginPage } from "./pages/auth/Login";
import { RegisterPage } from "./pages/auth/Register";
import { CartPage } from './pages/cart/CartPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { CourseDetails } from './pages/course/CourseDetails';
import { CourseViewer } from './pages/course/CourseViewer';
import { CreateCourse } from './pages/course/CreateCourse';
import { MyCourses } from './pages/course/MyCourses';
import { MyCoursesCreated } from './pages/course/MyCoursesCreated';
import { UpdateCourse } from './pages/course/UpdateCourse';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/profile/ProfilePage';

function App() {


  return (
    <Router>
      <Toaster position="top-center" />
      <LocationLogger />
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
            <Route
              path="/create-course"
              element={
                <ProtectedRoute requiresInstructor>
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course/:courseId/learn"
              element={
                <ProtectedRoute>
                  <CourseViewer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meus-cursos"
              element={
                <ProtectedRoute>
                  <MyCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor-courses"
              element={
                <ProtectedRoute>
                  <MyCoursesCreated />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editar-curso/:id"
              element={
                <ProtectedRoute requiresInstructor>
                  <UpdateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App;

