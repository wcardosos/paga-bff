import { ReferenceMonth } from '@/app/entities/reference-month';
import { BudgetRepository } from '@/app/repositories/budget.repository';

export class FetchBudgetGoalsService {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  async execute(referenceMonth: string) {
    const goals = await this.budgetRepository.getGoals(
      ReferenceMonth.create({ value: referenceMonth }),
    );

    return goals;
  }
}
