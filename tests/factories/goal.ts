import { Goal } from '@/app/entities/goal';
import { faker } from '@faker-js/faker';

export function makeGoal() {
  const amount = faker.number.float({ min: 100, max: 10_000 });
  const currentAmount = faker.number.float({ min: 100, max: 10_000 });
  return Goal.create({
    category: 'essential',
    amount,
    currentAmount,
    progress: (currentAmount / amount) * 100,
  });
}
