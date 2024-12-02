export type PaymentMethod = 'credit' | 'pix' | 'boleto';

export interface PaymentStatus {
  status: 'pending' | 'completed' | 'failed';
  message?: string;
}