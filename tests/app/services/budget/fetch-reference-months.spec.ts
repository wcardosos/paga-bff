import { ReferenceMonth } from '@/app/entities/reference-month';
import { BudgetRepository } from '@/app/repositories/budget.repository';
import { FetchReferenceMonths } from '@/app/services/budget/fetch-reference-months';
import { Mock } from 'vitest';

describe('FetchReferenceMonths', () => {
  const budgetRepository = {
    getReferenceMonths: vi.fn(),
  } as BudgetRepository;

  describe('execute', () => {
    it('should return a ReferenceMonth', async () => {
      (budgetRepository.getReferenceMonths as Mock).mockResolvedValue([
        ReferenceMonth.create({ value: '10/24' }),
        ReferenceMonth.create({ value: '11/24' }),
        ReferenceMonth.create({ value: '12/24' }),
      ]);

      const sut = new FetchReferenceMonths(budgetRepository);

      const referenceMonth = await sut.execute();

      expect(referenceMonth).toStrictEqual(['10/24', '11/24', '12/24']);
      expect(budgetRepository.getReferenceMonths).toHaveBeenCalledTimes(1);
    });
  });
});
