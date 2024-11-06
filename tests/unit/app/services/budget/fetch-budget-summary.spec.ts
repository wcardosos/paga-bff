import { Mock } from 'vitest';
import { BudgetSummary } from '@/app/entities/budget-summary';
import { FetchBudgetSummaryService } from '@/app/services/budget/fetch-budget-summary.service';
import { ReferenceMonth } from '@/app/entities/reference-month';
import { makeBudgetRepository } from 'tests/factories/budget';

describe('FetchBudgetSummaryService', () => {
  const budgetRepository = makeBudgetRepository();

  describe('execute', () => {
    it('should return the budget summary', async () => {
      (budgetRepository.getSummary as Mock).mockResolvedValue(
        BudgetSummary.create({
          income: 1440,
          expenses: 720,
          balance: 720,
          paid: 500,
          unpaid: 200,
          separated: 200,
        }),
      );
      const sut = new FetchBudgetSummaryService(budgetRepository);
      const result = await sut.execute('10/24');
      expect(result.map()).toStrictEqual({
        income: 1440,
        expenses: 720,
        balance: 720,
        paid: 500,
        unpaid: 200,
        separated: 200,
      });
      expect(budgetRepository.getSummary).toHaveBeenCalledTimes(1);
      expect(budgetRepository.getSummary).toHaveBeenCalledWith(
        expect.any(ReferenceMonth),
      );
    });

    it('should throw an error when repository return is null', async () => {
      (budgetRepository.getSummary as Mock).mockResolvedValue(null);
      const sut = new FetchBudgetSummaryService(budgetRepository);

      await expect(sut.execute('10/24')).rejects.toThrow(
        'Unable to get budget summary',
      );
    });
  });
});
