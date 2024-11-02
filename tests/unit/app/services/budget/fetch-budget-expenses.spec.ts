import { Mock } from 'vitest';
import { FetchBudgetExpenses } from '@/app/services/budget/fetch-budget-expenses';
import { ReferenceMonth } from '@/app/entities/reference-month';
import { makeBudgetRepository } from 'tests/factories/budget';
import { Expense } from '@/app/entities/expense';

describe('FetchBudgetExpenses', () => {
  const budgetRepository = makeBudgetRepository();

  describe('execute', () => {
    it('should return the budget summary', async () => {
      (budgetRepository.getExpenses as Mock).mockResolvedValue([
        Expense.create({
          description: 'Netflix',
          amount: 30,
          dueDay: 10,
          status: 'Não pago',
          category: 'Lazer',
        }),
        Expense.create({
          description: 'Aluguel',
          amount: 1000,
          dueDay: 10,
          status: 'Não pago',
          category: 'Essencial',
        }),
      ]);

      const sut = new FetchBudgetExpenses(budgetRepository);
      const result = await sut.execute('10/24');

      expect(result).toHaveLength(2);
      expect(budgetRepository.getExpenses).toHaveBeenCalledTimes(1);
      expect(budgetRepository.getExpenses).toHaveBeenCalledWith(
        expect.any(ReferenceMonth),
      );
    });
  });
});