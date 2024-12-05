import { Cart } from "../../types/cart"
import { CartItem } from "../CartItem"
interface ICardCartItem{
    cart: Cart,
    removeItem: any
}
export const CardCartItem = ({cart, removeItem}: ICardCartItem) => {
  return (
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
  )
}
