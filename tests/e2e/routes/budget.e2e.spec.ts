import { app } from '@/infra/app';
import { GoogleSheetsBudgetRepository } from '@/infra/repositories/google-sheets-budget.repository';
import { makeReferenceMonth } from 'tests/factories/reference-month';
import { makeBudgetSummary } from 'tests/factories/budget-summary';
import { ResourceNotFoundError } from '@/app/errors/resource-not-found';
import { UnmappedError } from '@/app/errors/unmapped';
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

  describe('[GET] /summary', () => {
    const getSummarySpy = vi.spyOn(
      GoogleSheetsBudgetRepository.prototype,
      'getSummary',
    );

    test('return status 400 when referenceMonth is not provided', async () => {
      const response = await request(app.server).get('/budgets/summary');

      expect(response.status).toBe(400);
      expect(response.text).toBe('Reference month must be provided');
    });

    test('should return summary', async () => {
      const budgetSummary = makeBudgetSummary();

      getSummarySpy.mockResolvedValueOnce(budgetSummary);

      const response = await request(app.server).get(
        '/budgets/summary?referenceMonth=11/24',
      );

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(budgetSummary.map());
    });

    test('should return 404 when repository not found summary', async () => {
      getSummarySpy.mockRejectedValueOnce(new ResourceNotFoundError('Summary'));

      const response = await request(app.server).get(
        '/budgets/summary?referenceMonth=11/24',
      );

      expect(response.status).toBe(404);
      expect(response.text).toBe('Summary not found');
    });

    test('should return 500 when unmapped error is thrown', async () => {
      getSummarySpy.mockRejectedValueOnce(new UnmappedError(new Error()));

      const response = await request(app.server).get(
        '/budgets/summary?referenceMonth=11/24',
      );

      expect(response.status).toBe(500);
      expect(response.text).toBe('Unmapped error: Error');
    });
  });
});
