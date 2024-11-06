import { Expense } from '../entities/expense';
import { Goal } from '../entities/goal';
import { ReferenceMonth } from '../entities/reference-month';
import { BudgetSummary } from '@/app/entities/budget-summary';

export interface BudgetRepository {
  getReferenceMonths(): Promise<ReferenceMonth[]>;
  getSummary(referenceMonth: ReferenceMonth): Promise<BudgetSummary | null>;
  getExpenses(referenceMonth: ReferenceMonth): Promise<Expense[]>;
  getGoals(referenceMonth: ReferenceMonth): Promise<Goal[]>;
}
