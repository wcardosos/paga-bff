import { Expense } from '@/app/entities/expense';
import { faker } from '@faker-js/faker';

export function makeExpense() {
  return Expense.create({
    description: faker.lorem.sentence(),
    amount: faker.number.float({ min: 1 }),
    dueDay: faker.number.int({ min: 1, max: 31 }),
    status: 'unpaid',
    category: 'essential',
  });
}
