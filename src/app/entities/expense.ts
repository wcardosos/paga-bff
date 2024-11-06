import { Entity } from './entity';
import { CategoryValue } from './value-objects/category';

export type ExpenseStatus = 'paid' | 'unpaid' | 'separated';

interface ExpenseProps {
  description: string;
  amount: number;
  dueDay: number | null;
  status: ExpenseStatus | null;
  category: CategoryValue | null;
}

export class Expense extends Entity<ExpenseProps> {
  static create(props: ExpenseProps) {
    return new Expense(props);
  }
}
