import { GraduationCap } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';
import { LoggedIn } from './navbar/LoggedIn';
import { NoLoggedIn } from './navbar/NoLoggedIn';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const cartItems = useCartStore((state) => state.cart.items);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <GraduationCap className="w-8 h-8" />
            <span>E-Learning</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? <LoggedIn user={user} cartItems={cartItems} signOut={signOut} /> : <NoLoggedIn />}
          </div>
        </div>
      </div>
    </nav>
  );
};