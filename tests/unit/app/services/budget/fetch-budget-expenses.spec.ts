import { Mock } from 'vitest';
import { FetchBudgetExpensesService } from '@/app/services/budget/fetch-budget-expenses.service';
import { ReferenceMonth } from '@/app/entities/reference-month';
import { makeBudgetRepository } from 'tests/factories/budget';
import { Expense } from '@/app/entities/expense';

describe('FetchBudgetExpensesService', () => {
  const budgetRepository = makeBudgetRepository();

  describe('execute', () => {
    it('should return the budget expenses', async () => {
      (budgetRepository.getExpenses as Mock).mockResolvedValue([
        Expense.create({
          description: 'Netflix',
          amount: 30,
          dueDay: 10,
          status: 'unpaid',
          category: 'leisure',
        }),
        Expense.create({
          description: 'Aluguel',
          amount: 1000,
          dueDay: 10,
          status: 'unpaid',
          category: 'essential',
        }),
      ]);

      const sut = new FetchBudgetExpensesService(budgetRepository);
      const result = await sut.execute('10/24');

      expect(result).toHaveLength(2);
      expect(budgetRepository.getExpenses).toHaveBeenCalledTimes(1);
      expect(budgetRepository.getExpenses).toHaveBeenCalledWith(
        expect.any(ReferenceMonth),
      );
    });
  });
});
