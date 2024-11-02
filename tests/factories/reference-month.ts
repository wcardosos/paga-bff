import { ReferenceMonth } from '@/app/entities/reference-month';
import { faker } from '@faker-js/faker';

export function makeReferenceMonth() {
  const monthNumber = faker.number
    .int({ min: 1, max: 12 })
    .toString()
    .padStart(2, '0');
  const yearNumber = faker.number.int({ min: 24, max: 30 });

  return ReferenceMonth.create({
    value: `${monthNumber}/${yearNumber}`,
  });
}
