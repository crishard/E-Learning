import React from 'react';

export const BoletoPayment: React.FC = () => {
  return (
    <div className="text-center">
      <h3 className="text-lg font-medium mb-4">Pagamento via Boleto</h3>
      <p className="text-sm text-gray-600 mb-6">
        O boleto será gerado após a confirmação da compra
      </p>
      <div className="text-sm text-gray-500">
        <p>Prazo de compensação: até 3 dias úteis</p>
        <p className="mt-2">O acesso será liberado após a confirmação do pagamento</p>
      </div>
    </div>
  );
};