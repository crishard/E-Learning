import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

export const PixPayment: React.FC = () => {
  // Simulated PIX data - in a real app, this would come from your backend
  const pixKey = '00020126330014br.gov.bcb.pix01110790691230652040000530398654040.015802BR5924Antonio Crislan da Comce6008Brasilia62090505y7xyz6304DF30';
  const displayKey = "crislantorres9@gmail.com"; // Replace with your actual PIX key
  return (
    <div className="text-center">
      <h3 className="text-lg font-medium mb-4">Pagamento via PIX</h3>
      <p className="text-sm text-gray-600 mb-6">
        Escaneie o QR Code abaixo para pagar R$ 0,01 e simular a compra
      </p>
      <div className="flex justify-center mb-6">
        <QRCodeSVG
          value={pixKey}
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>
      <div className="text-sm text-gray-500">
        <p>Após o pagamento, seu acesso será liberado automaticamente</p>
        <p className="mt-2">Chave PIX: {displayKey}</p>
      </div>
    </div>
  );
};