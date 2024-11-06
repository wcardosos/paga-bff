import { BudgetRepository } from '@/app/repositories/budget.repository';

export class FetchReferenceMonthsService {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  async execute(): Promise<string[]> {
    const referenceMonths = await this.budgetRepository.getReferenceMonths();

    return referenceMonths
      .filter((referenceMonth) => /\d{1,2}\/\d{2}/.test(referenceMonth.value))
      .map((referenceMonth) => {
        const [month, year] = referenceMonth.value.split('/');

        return `${month.padStart(2, '0')}/${year}`;
      });
  }
}
