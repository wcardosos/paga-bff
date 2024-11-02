import { BudgetSummary } from '@/app/entities/budget-summary';

export function makeBudgetSummary() {
  return BudgetSummary.create({
    income: 1000,
    expenses: 500,
    balance: 500,
    paid: 500,
    unpaid: 0,
    separated: 0,
  });
}
