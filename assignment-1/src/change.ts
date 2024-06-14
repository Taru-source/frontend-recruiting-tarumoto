import { Payments } from './paymentMethod';

export function change(invoiceAmount: number, payments: Payments) {
  let remainingAmount = invoiceAmount;

  if (_hasDiscountVoucher(payments)) {
    const discountPayment = payments.find((payment) => 'discountRate' in payment);
    if (discountPayment) {
      const discountRate = (discountPayment as { discountRate: number }).discountRate;
      remainingAmount = _applyDiscountRate(remainingAmount, discountRate);
    }
  }

  if (_hasReductionVoucher(payments)) {
    const reductionPayment = payments.find((payment) => 'reductionAmount' in payment);
    if (reductionPayment) {
      const reductionAmount = (reductionPayment as { reductionAmount: number }).reductionAmount;
      remainingAmount = _applyReductionAmount(remainingAmount, reductionAmount);
    }
  }

  if (remainingAmount <= 0) {
    return 0;
  }

  const cashPayment = payments.find((payment) => 'cashAmount' in payment);
  if (cashPayment) {
    const cashAmount = (cashPayment as { cashAmount: number }).cashAmount;
    remainingAmount -= cashAmount;
  }

  if (remainingAmount > 0) {
    throw new Error('お預かり金額が不足しています');
  }

  return -remainingAmount === -0 ? 0 : -remainingAmount;
}

function _hasDiscountVoucher(payments: Payments): boolean {
  return payments.some((payment) => 'discountRate' in payment);
}

function _hasReductionVoucher(payments: Payments): boolean {
  return payments.some((payment) => 'reductionAmount' in payment);
}

function _applyDiscountRate(invoiceAmount: number, discountRate: number): number {
  return (invoiceAmount * discountRate) / 100;
}

function _applyReductionAmount(invoiceAmount: number, reductionAmount: number): number {
  return invoiceAmount - reductionAmount;
}
