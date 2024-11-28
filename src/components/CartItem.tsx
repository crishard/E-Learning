import { Trash2 } from 'lucide-react';
import React from 'react';
import { formatPrice } from '../lib/utils';
import { CartItem as CartItemType } from '../types/cart';

interface CartItemProps {
  item: CartItemType;
  onRemove: (courseId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-blue-600 font-semibold">{formatPrice(item.price)}</p>
      </div>
      <button
        onClick={() => onRemove(item.courseId)}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};