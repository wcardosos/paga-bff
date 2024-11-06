import { BudgetRepository } from '@/app/repositories/budget.repository';

export function makeBudgetRepository() {
  return {
    getReferenceMonths: vi.fn(),
    getSummary: vi.fn(),
    getExpenses: vi.fn(),
    getGoals: vi.fn(),
  } as BudgetRepository;
}
