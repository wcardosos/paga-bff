import { Entity } from './entity';

export type ExpenseStatus = 'Pago' | 'Não pago' | 'Separado';
export type ExpenseCategory = 'Essencial' | 'Lazer' | 'Investimento';

interface ExpenseProps {
  description: string;
  amount: number;
  dueDay: number | null;
  status: ExpenseStatus;
  category: ExpenseCategory;
}

export class Expense extends Entity<ExpenseProps> {
  static create(props: ExpenseProps) {
    return new Expense(props);
  }
}
