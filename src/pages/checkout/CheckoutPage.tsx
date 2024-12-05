import React, { Suspense } from 'react';
import { OrderSummaryCheckout } from '../../components/checkout/OrderSummaryCheckout';
import { PaymentMethodComponent } from '../../components/checkout/PaymentMethod';
import { LoadingSpinner } from '../../components/courseAdm/LoadingSpinner';
import { useCheckout } from '../../hooks/useCheckout';

export const CheckoutPage: React.FC = () => {
    const { 
        paymentMethod, 
        setPaymentMethod, 
        loading, 
        handlePayment, 
        PaymentComponent, 
        cart, 
        user 
    } = useCheckout();

    if (!user || cart.items.length === 0) {
        return <div className="text-center py-12">Carrinho vazio</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <PaymentMethodComponent 
                        paymentMethod={paymentMethod} 
                        setPaymentMethod={setPaymentMethod}
                    />

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <Suspense fallback={<LoadingSpinner />}>
                            <PaymentComponent />
                        </Suspense>
                    </div>
                </div>

                <OrderSummaryCheckout 
                    loading={loading} 
                    cart={cart} 
                    handlePayment={handlePayment} 
                />
            </div>
        </div>
    );
};