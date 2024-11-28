import { LogOut, ShoppingBag, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
    const { user, signOut } = useAuth();
    const cartItems = useCartStore((state) => state.cart.items);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        E-Learning
                    </Link>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                {user.role === 'instructor' && (
                                    <Link
                                        to="/create-course"
                                        className="text-sm font-medium text-gray-700 hover:text-blue-600"
                                    >
                                        Criar Curso
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="text-sm font-medium">{user.displayName}</span>
                                </Link>
                                <Link to="/checkout" className="relative">
                                    <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-blue-600" />
                                    {cartItems.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={signOut}
                                    className="flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sair
                                </Button>
                            </>
                        ) : (
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
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};