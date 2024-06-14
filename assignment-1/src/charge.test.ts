import { charge } from './charge';

describe('charge -- 請求書(Invoice)と支払い(Paymentes)を受け取り、レシート(Receipt)を返却する', () => {
  describe('changeに着目', () => {
    test('値引き券で全額払った場合', () => {
      const invoice = { amount: 100 };
      const payments = [{ reductionAmount: 1000 }];
      expect(charge(invoice, payments)).toEqual({
        total: 100,
        deposit: 1000,
        change: 0,
      });
    });

    test('現金の支払いが含まれている場合はお釣りを出す', () => {
      const invoice = { amount: 1500 };
      const payments = [{ cashAmount: 1000 }, { reductionAmount: 1000 }];
      expect(charge(invoice, payments)).toEqual({
        total: 1500,
        deposit: 2000,
        change: 500,
      });
    });

    test('割引券は最初に適用される', () => {
      const invoice = { amount: 1000 };
      const payments = [{ discountRate: 50 }, { cashAmount: 700 }];
      expect(charge(invoice, payments)).toEqual({
        total: 1000,
        deposit: 700,
        change: 200,
      });
    });

    test('割引券と値引き券の組み合わせの場合も割引券が先に適用される', () => {
      const invoice = { amount: 1000 };
      const payments = [{ discountRate: 50 }, { reductionAmount: 600 }];
      expect(charge(invoice, payments)).toEqual({
        total: 1000,
        deposit: 600,
        change: 0,
      });
    });
  });

  describe('depositに着目', () => {
    test('現金と値引き券のみがdepositに加算される', () => {
      const invoice = { amount: 1000 };
      const payments = [{ cashAmount: 500 }, { reductionAmount: 500 }];
      expect(charge(invoice, payments)).toEqual({
        total: 1000,
        deposit: 1000,
        change: 0,
      });
    });

    test('割引券はdepositに何も影響を与えない', () => {
      const invoice = { amount: 1000 };
      const payments = [{ discountRate: 50 }, { reductionAmount: 1000 }];
      expect(charge(invoice, payments)).toEqual({
        total: 1000,
        deposit: 1000,
        change: 0,
      });
    });
  });
});
