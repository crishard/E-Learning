import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { useCartStore } from '../store/cartStore';
import { PaymentMethod } from '../types/payment';

interface UseCheckoutParams {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const useCheckout = ({ onSuccess, onError }: UseCheckoutParams = {}) => {
    const navigate = useNavigate();
    const { user, updateEnrolledCourses } = useAuth();
    const { cart, clearCart } = useCartStore();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
    const [loading, setLoading] = useState(false);

    const validateCheckout = () => {
        if (!user) {
            toast.error('Usuário não autenticado');
            return false;
        }
        if (cart.items.length === 0) {
            toast.error('Carrinho está vazio');
            return false;
        }
        return true;
    };

    const handlePayment = async () => {
        if (!validateCheckout()) return;

        setLoading(true);
        try {
            const userRef = doc(db, 'users', user!.uid);
            const enrolledCourses = cart.items.map(item => item.courseId);


            await updateDoc(userRef, {
                enrolledCourses: [...(user!.enrolledCourses || []), ...enrolledCourses]
            });


            await updateEnrolledCourses(enrolledCourses);


            clearCart();


            toast.success('Pedido realizado com sucesso!');

            if (onSuccess) {
                onSuccess();
            } else {
                navigate('/meus-cursos');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Erro ao processar pagamento');


            if (onError) {
                onError(error as Error);
            }
        } finally {
            setLoading(false);
        }
    };

    const PaymentComponent = React.lazy(() => {
        return {
            credit: () => import('../components/payment/CreditCardPayment').then(m => ({ default: m.CreditCardPayment })),
            pix: () => import('../components/payment/PixPayment').then(m => ({ default: m.PixPayment })),
            boleto: () => import('../components/payment/BoletoPayment').then(m => ({ default: m.BoletoPayment }))
        }[paymentMethod]();
    });

    return {
        paymentMethod,
        setPaymentMethod,
        loading,
        handlePayment,
        PaymentComponent,
        cart,
        user
    };
};