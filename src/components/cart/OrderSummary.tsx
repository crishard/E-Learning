import { formatPrice } from "../../lib/utils"
import { Cart } from "../../types/cart"
interface IOrderSummary{
    cart: Cart
}

const OrderSummary = ({cart}: IOrderSummary) => {
    return (
        <div>
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
        </div>
    )
}

export default OrderSummary