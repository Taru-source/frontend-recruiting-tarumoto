import { Payments } from './paymentMethod';
import { z } from 'zod';
import { change } from './change';

const InvoiceSchema = z.object({
  amount: z.number().min(0),
});

type Invoice = z.infer<typeof InvoiceSchema>;

const ReceiptSchema = z.object({
  total: z.number().min(0),
  deposit: z.number().min(0),
  change: z.number().min(0),
});

type Receipt = z.infer<typeof ReceiptSchema>;

export function charge(invoice: Invoice, payments: Payments): Receipt {
  try {
    const chageAmount = change(invoice.amount, payments);
    return {
      total: invoice.amount,
      deposit: payments
        .map(
          (payment) =>
            ((payment as { cashAmount: number }).cashAmount ?? 0) +
            ((payment as { reductionAmount: number }).reductionAmount ?? 0),
        )
        .reduce((total, amount) => total + amount, 0),
      change: chageAmount,
    };
  } catch (error: any) {
    throw error;
  }
}
