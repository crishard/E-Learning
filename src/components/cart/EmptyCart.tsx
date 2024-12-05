import { ShoppingCart as CartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow">
      <CartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Seu carrinho está vazio
      </h2>
      <p className="text-gray-600 mb-6">
        Explore nossos cursos e comece sua jornada de aprendizado.
      </p>
      <Button onClick={() => navigate('/')}>
        Explorar Cursos
      </Button>
    </div>
  )
}
