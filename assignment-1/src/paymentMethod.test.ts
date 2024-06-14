import { PaymentMethod, PaymentMethodSchema } from './paymentMethod';
import { z } from 'zod';

describe('PaymentMethod Type', () => {
  test('現金の支払いができる', () => {
    const validCash: PaymentMethod = { cashAmount: 1000 };
    expect(() => PaymentMethodSchema.parse(validCash)).not.toThrow();
  });

  test('割引券の支払いができる', () => {
    const validDiscountVoucher: PaymentMethod = { discountRate: 10 };
    expect(() => PaymentMethodSchema.parse(validDiscountVoucher)).not.toThrow();
  });

  test('値引き券での支払いができる', () => {
    const validReductionVoucher: PaymentMethod = { reductionAmount: 5000 };
    expect(() => PaymentMethodSchema.parse(validReductionVoucher)).not.toThrow();
  });

  test('現金と割引券の組み合わせでの支払いができる', () => {
    const validCombinedPayment: PaymentMethod = { cashAmount: 2000, discountRate: 20 };
    expect(() => PaymentMethodSchema.parse(validCombinedPayment)).not.toThrow();
  });

  test('現金と値引き券の組み合わせの支払いができる', () => {
    const validCombinedPayment: PaymentMethod = { cashAmount: 1500, reductionAmount: 3000 };
    expect(() => PaymentMethodSchema.parse(validCombinedPayment)).not.toThrow();
  });

  test('不正な割引額で支払いはできない', () => {
    const invalidPayment: PaymentMethod = { discountRate: 500 };
    expect(() => PaymentMethodSchema.parse(invalidPayment)).toThrow(z.ZodError);
  });
});
