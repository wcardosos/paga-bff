import { Entity } from './entity';
import { CategoryValue } from './value-objects/category';

interface GoalProps {
  category: CategoryValue | null;
  amount: number;
  currentAmount: number;
  progress: number;
}

export class Goal extends Entity<GoalProps> {
  static create(props: GoalProps) {
    return new Goal(props);
  }
}
