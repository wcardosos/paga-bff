import { BudgetRepository } from '@/app/repositories/budget.repository';

export class FetchReferenceMonths {
  constructor(private readonly budgetRepository: BudgetRepository) {}
  async execute(): Promise<string[]> {
    const referenceMonths = await this.budgetRepository.getReferenceMonths();

    return referenceMonths
      .filter((referenceMonth) => /\d{2}\/\d{2}/.test(referenceMonth.value))
      .map((referenceMonth) => referenceMonth.value);
  }
}
