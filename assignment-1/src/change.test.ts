import { change } from './change';

describe('change', () => {
  test('値引き券で全額支払った場合はお釣りは出さない', () => {
    const invoiceAmount = 100;
    const payments = [{ reductionAmount: 1000 }];
    expect(change(invoiceAmount, payments)).toBe(0);
  });

  test('現金の支払いが含まれている場合はお釣りを出す', () => {
    const invoiceAmount = 1500;
    const payments = [{ cashAmount: 1000 }, { reductionAmount: 1000 }];
    expect(change(invoiceAmount, payments)).toBe(500);
  });

  test('割引券は最初に適用される', () => {
    const invoiceAmount = 1000;
    const payments = [{ discountRate: 50 }, { cashAmount: 700 }];
    expect(change(invoiceAmount, payments)).toBe(200);
  });

  test('割引券と値引き券の組み合わせの場合も割引券が先に適用される', () => {
    const invoiceAmount = 1000;
    const payments = [{ discountRate: 50 }, { reductionAmount: 600 }];
    expect(change(invoiceAmount, payments)).toBe(0);
  });

  test('割引券と値引き券と現金の組み合わせの場合は割引券>値引き件の順に適用される', () => {
    const invoiceAmount = 2000;
    const payments = [{ discountRate: 50 }, { reductionAmount: 600 }, { cashAmount: 1000 }];
    expect(change(invoiceAmount, payments)).toBe(600);
  });

  test('支払いが不足している場合はエラーを返す', () => {
    const invoiceAmount = 1000;
    const payments = [{ cashAmount: 500 }];
    expect(() => change(invoiceAmount, payments)).toThrowError('お預かり金額が不足しています');
  });
});
