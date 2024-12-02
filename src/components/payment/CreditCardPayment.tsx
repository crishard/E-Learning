import React from 'react';

export const CreditCardPayment: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Dados do Cartão</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Número do Cartão
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="1234 5678 9012 3456"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Validade
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="MM/AA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="123"
          />
        </div>
      </div>
    </div>
  );
};