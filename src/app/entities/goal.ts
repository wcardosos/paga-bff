import { Entity } from './entity';
import { ExpenseCategory } from './expense';

interface GoalProps {
  category: ExpenseCategory;
  amount: number;
  currentAmount: number;
  progress: number;
}

export class Goal extends Entity<GoalProps> {
  static create(props: GoalProps) {
    return new Goal(props);
  }
}
