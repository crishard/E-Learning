import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BoletoPayment } from '../../components/payment/BoletoPayment';
import { CreditCardPayment } from '../../components/payment/CreditCardPayment';
import { PixPayment } from '../../components/payment/PixPayment';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';
import { PaymentMethod } from '../../types/payment';

export const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, updateEnrolledCourses } = useAuth();
    const { cart, clearCart } = useCartStore();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
    const [loading, setLoading] = useState(false);

    if (!user || cart.items.length === 0) {
        return <div className="text-center py-12">Carrinho vazio</div>;
    }

    const handlePayment = async () => {
        setLoading(true);
        try {
            const order = {
                userId: user.uid,
                items: cart.items,
                total: cart.total,
                paymentMethod,
                status: 'completed',
                createdAt: new Date(),
            };

            const orderRef = await addDoc(collection(db, 'orders'), order);

            // Update user's enrolled courses
            const userRef = doc(db, 'users', user.uid);
            const enrolledCourses = cart.items.map(item => item.courseId);
            await updateDoc(userRef, {
                enrolledCourses: [...(user.enrolledCourses || []), ...enrolledCourses]
            });
            await updateEnrolledCourses(enrolledCourses);

            clearCart();
            toast.success('Pedido realizado com sucesso!');
            navigate('/meus-cursos');
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Erro ao processar pagamento');
        } finally {
            setLoading(false);
        }
    };

    const PaymentComponent = {
        credit: CreditCardPayment,
        pix: PixPayment,
        boleto: BoletoPayment
    }[paymentMethod];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
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

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <PaymentComponent />
                    </div>
                </div>

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
            </div>
        </div>
    );
};