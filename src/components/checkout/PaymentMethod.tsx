import { PaymentMethod } from '../../types/payment';
interface IPaymentMethod{
    paymentMethod: PaymentMethod,
    setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>
}
export const PaymentMethodComponent = ({paymentMethod, setPaymentMethod}: IPaymentMethod) => {

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-lg font-semibold mb-4">Método de Pagamento</h2>
    <div className="space-y-4">
        <label className="flex items-center">
            <input
                type="radio"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="mr-2"
            />
            Cartão de Crédito
        </label>
        <label className="flex items-center">
            <input
                type="radio"
                value="pix"
                checked={paymentMethod === 'pix'}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="mr-2"
            />
            PIX
        </label>
        <label className="flex items-center">
            <input
                type="radio"
                value="boleto"
                checked={paymentMethod === 'boleto'}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="mr-2"
            />
            Boleto Bancário
        </label>
    </div>
</div>
  )
}
