import { Goal } from '@/app/entities/goal';
import { ReferenceMonth } from '@/app/entities/reference-month';
import { FetchBudgetGoalsService } from '@/app/services/budget/fetch-budget-goals.service';
import { makeBudgetRepository } from 'tests/factories/budget';
import { Mock } from 'vitest';

describe('FetchBudgetGoalsService', () => {
  const budgetRepository = makeBudgetRepository();

  describe('execute', () => {
    it('should return the budget goals', async () => {
      (budgetRepository.getGoals as Mock).mockResolvedValue([
        Goal.create({
          category: 'essential',
          amount: 1000,
          currentAmount: 500,
          progress: 50,
        }),
        Goal.create({
          category: 'leisure',
          amount: 500,
          currentAmount: 250,
          progress: 50,
        }),
        Goal.create({
          category: 'investments',
          amount: 250,
          currentAmount: 125,
          progress: 50,
        }),
      ]);

      const sut = new FetchBudgetGoalsService(budgetRepository);
      const result = await sut.execute('10/24');

      expect(result).toHaveLength(3);
      expect(budgetRepository.getGoals).toHaveBeenCalledTimes(1);
      expect(budgetRepository.getGoals).toHaveBeenCalledWith(
        expect.any(ReferenceMonth),
      );
    });
  });
});
