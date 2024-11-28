import { LogOut, ShoppingBag, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            E-Learning
          </Link>

          <div className="flex items-center gap-6">
            
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="w-5 h-5" />
                  
                </Link>
                <Link to="/checkout" className="relative">
                  <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-blue-600" />
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </>

              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Cadastre-se
                </Link>
              </div>
            
          </div>
        </div>
      </div>
    </nav>
  );
};