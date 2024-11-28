import { ShoppingCart as CartIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../components/CartItem';
import { Button } from '../../components/ui/Button';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeItem, clearCart } = useCartStore();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <CartIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
      </div>

      {cart.items.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y">
                {cart.items.map((item) => (
                  <div key={item.courseId} className="p-6">
                    <CartItem item={item} onRemove={removeItem} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Limpar Carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};