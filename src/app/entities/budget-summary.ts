import { Entity } from '@/app/entities/entity';

export interface BudgetSummaryProps {
  income: number;
  expenses: number;
  balance: number;
  paid: number;
  unpaid: number;
  separated: number;
}

export class BudgetSummary extends Entity<BudgetSummaryProps> {
  static create(props: BudgetSummaryProps) {
    return new BudgetSummary(props);
  }
}
