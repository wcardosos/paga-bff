import { BudgetRepository } from '@/app/repositories/budget.repository';
import { ReferenceMonth } from '@/app/entities/reference-month';
import { BudgetSummary } from '@/app/entities/budget-summary';

export class FetchBudgetSummary {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  async execute(plainReferenceMonth: string): Promise<BudgetSummary> {
    const referenceMonth = ReferenceMonth.create({
      value: plainReferenceMonth,
    });

    const budgetSummary =
      await this.budgetRepository.getSummary(referenceMonth);

    if (!budgetSummary) throw new Error('Unable to get budget summary');

    return budgetSummary;
  }
}
