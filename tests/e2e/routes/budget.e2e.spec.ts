import { app } from '@/infra/app';
import { GoogleSheetsBudgetRepository } from '@/infra/repositories/google-sheets-budget.repository';
import { makeReferenceMonth } from 'tests/factories/reference-month';
import request from 'supertest';

describe('/budgets', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('[GET] /reference-months', async () => {
    const getReferenceMonthsSpy = vi.spyOn(
      GoogleSheetsBudgetRepository.prototype,
      'getReferenceMonths',
    );
    const referenceMonths = [
      makeReferenceMonth(),
      makeReferenceMonth(),
      makeReferenceMonth(),
    ];

    getReferenceMonthsSpy.mockResolvedValueOnce(referenceMonths);

    const response = await request(app.server).get('/budgets/reference-months');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(
      referenceMonths.map((referenceMonth) => referenceMonth.value),
    );
  });
});
