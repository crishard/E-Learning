import { Button } from "../ui/Button"
interface IActionsCart{
    clearCart: () => void, 
    handleCheckout: () => void
}
const ActionsCart = ({handleCheckout, clearCart}: IActionsCart) => {
    return (
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
    )
}

export default ActionsCart