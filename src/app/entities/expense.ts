import { Entity } from './entity';

export type ExpenseStatus = 'paid' | 'unpaid' | 'separated';
export type ExpenseCategory = 'essential' | 'leisure' | 'investments';

interface ExpenseProps {
  description: string;
  amount: number;
  dueDay: number | null;
  status: ExpenseStatus | null;
  category: ExpenseCategory | null;
}

export class Expense extends Entity<ExpenseProps> {
  static create(props: ExpenseProps) {
    return new Expense(props);
  }
}
