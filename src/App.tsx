import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { LocationLogger } from './components/LocationLogger.tsx';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <LocationLogger />
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <AppRoutes />
        </div>
      </main>
    </Router>
  );
}

export default App;
