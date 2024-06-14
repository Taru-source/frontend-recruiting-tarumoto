import { z } from 'zod';

const CashSchema = z.object({
  cashAmount: z.number().min(0),
});

const DiscountVoucherSchema = z.object({
  discountRate: z.number().min(0).max(100),
});

const ReductionVoucherSchema = z.object({
  reductionAmount: z.number().min(0),
});

const VoucherSchema = DiscountVoucherSchema.or(ReductionVoucherSchema);

const PaymentMethodSchema = CashSchema.or(VoucherSchema).or(CashSchema.and(VoucherSchema));

type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
type Payments = PaymentMethod[];

export { Payments, PaymentMethod, PaymentMethodSchema };
