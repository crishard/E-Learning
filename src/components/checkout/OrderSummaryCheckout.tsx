import { formatPrice } from "../../lib/utils"
import { Cart } from "../../types/cart"
import { Button } from "../ui/Button"

interface IOrderSummaryCheckout{
  loading: boolean,
  cart: Cart,
  handlePayment: () => Promise<void>
}

export const OrderSummaryCheckout = ({loading, cart, handlePayment}: IOrderSummaryCheckout) => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.courseId} className="flex justify-between">
              <span>{item.title}</span>
              <span>{formatPrice(item.price)}</span>
            </div>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatPrice(cart.total)}</span>
            </div>
          </div>
        </div>
        <Button
          className="w-full mt-6"
          onClick={handlePayment}
          isLoading={loading}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}
