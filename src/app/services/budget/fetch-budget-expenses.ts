import { Expense } from '@/app/entities/expense';
import { ReferenceMonth } from '@/app/entities/reference-month';
import { BudgetRepository } from '@/app/repositories/budget.repository';

export class FetchBudgetExpenses {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  async execute(referenceMonth: string): Promise<Expense[]> {
    const expenses = await this.budgetRepository.getExpenses(
      ReferenceMonth.create({ value: referenceMonth }),
    );

    return expenses;
  }
}
