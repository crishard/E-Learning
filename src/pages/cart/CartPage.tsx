import { ShoppingCart as CartIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionsCart from '../../components/cart/ActionsCart';
import { CardCartItem } from '../../components/cart/CardCartItem';
import { EmptyCart } from '../../components/cart/EmptyCart';
import OrderSummary from '../../components/cart/OrderSummary';
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
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CardCartItem cart={cart} removeItem={removeItem}/>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <OrderSummary cart={cart} />
              <ActionsCart clearCart={clearCart} handleCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};