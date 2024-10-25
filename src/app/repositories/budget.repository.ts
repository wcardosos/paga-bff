import { ReferenceMonth } from '../entities/reference-month';

export interface BudgetRepository {
  getReferenceMonths(): Promise<ReferenceMonth[]>;
}
