import { CirclePlus, LogOut, ShoppingBag, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CartItem } from '../../types/cart'
import { UserProfile } from '../../types/user'
import { Button } from '../ui/Button'

interface ILoggedInProps {
    user: UserProfile,
    cartItems: CartItem[],
    signOut: () => Promise<void>
}

export const LoggedIn = ({ user, cartItems, signOut }: ILoggedInProps) => {
    return (
        <>
            {user.role === 'instructor' && (
                <Link
                    to="/create-course"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                    <CirclePlus className="w-5 h-5 sm:hidden block" />
                    <span className='sm:block hidden'>Criar Curso</span>
                </Link>
            )}
            <div className="relative t-0 group">
                <Link
                    to="/profile"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                    <User className="w-5 h-5" />
                </Link>
                <div className=" absolute right-0 mt-[-5px] w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link
                        to="meus-cursos"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        {user.role === 'instructor' ? "Aprendizado" : "Meus Cursos"}
                    </Link>
                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Perfil
                    </Link>
                </div>
            </div>
            <Link
                to="/cart"
                className="relative text-gray-700 hover:text-blue-600"
            >
                <ShoppingBag className="w-6 h-6" />
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
                <span className="sm:block hidden">Sair</span>
            </Button>
        </>
    )
}
