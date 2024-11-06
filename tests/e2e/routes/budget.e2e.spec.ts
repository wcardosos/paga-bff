import { app } from '@/infra/app';
import { GoogleSheetsBudgetRepository } from '@/infra/repositories/google-sheets-budget.repository';
import { makeReferenceMonth } from 'tests/factories/reference-month';
import { makeBudgetSummary } from 'tests/factories/budget-summary';
import { ResourceNotFoundError } from '@/app/errors/resource-not-found';
import { UnmappedError } from '@/app/errors/unmapped';
import request from 'supertest';
import { makeExpense } from 'tests/factories/expense';
import { makeGoal } from 'tests/factories/goal';

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

  describe('[GET] /expenses', () => {
    const getExpensesSpy = vi.spyOn(
      GoogleSheetsBudgetRepository.prototype,
      'getExpenses',
    );

    test('return status 400 when referenceMonth is not provided', async () => {
      const response = await request(app.server).get('/budgets/expenses');

      expect(response.status).toBe(400);
      expect(response.text).toBe('Reference month must be provided');
    });

    test('should return expenses', async () => {
      const expenses = [makeExpense(), makeExpense(), makeExpense()];

      getExpensesSpy.mockResolvedValueOnce(expenses);

      const response = await request(app.server).get(
        '/budgets/expenses?referenceMonth=11/24',
      );

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(
        expenses.map((expense) => expense.map()),
      );
    });

    test('should return 404 when repository not found expenses', async () => {
      getExpensesSpy.mockRejectedValueOnce(
        new ResourceNotFoundError('Expenses'),
      );

      const response = await request(app.server).get(
        '/budgets/expenses?referenceMonth=11/24',
      );

      expect(response.status).toBe(404);
      expect(response.text).toBe('Expenses not found');
    });

    test('should return 500 when unmapped error is thrown', async () => {
      getExpensesSpy.mockRejectedValueOnce(new UnmappedError(new Error()));

      const response = await request(app.server).get(
        '/budgets/expenses?referenceMonth=11/24',
      );

      expect(response.status).toBe(500);
      expect(response.text).toBe('Unmapped error: Error');
    });
  });

  describe('[GET] /goals', () => {
    const getGoalsSpy = vi.spyOn(
      GoogleSheetsBudgetRepository.prototype,
      'getGoals',
    );

    test('return status 400 when referenceMonth is not provided', async () => {
      const response = await request(app.server).get('/budgets/goals');

      expect(response.status).toBe(400);
      expect(response.text).toBe('Reference month must be provided');
    });

    test('should return goals', async () => {
      const goals = [makeGoal(), makeGoal(), makeGoal()];

      getGoalsSpy.mockResolvedValueOnce(goals);

      const response = await request(app.server).get(
        '/budgets/goals?referenceMonth=11/24',
      );

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(goals.map((goal) => goal.map()));
    });

    test('should return 404 when repository not found goals', async () => {
      getGoalsSpy.mockRejectedValueOnce(new ResourceNotFoundError('Goals'));

      const response = await request(app.server).get(
        '/budgets/goals?referenceMonth=11/24',
      );

      expect(response.status).toBe(404);
      expect(response.text).toBe('Goals not found');
    });

    test('should return 500 when unmapped error is thrown', async () => {
      getGoalsSpy.mockRejectedValueOnce(new UnmappedError(new Error()));

      const response = await request(app.server).get(
        '/budgets/goals?referenceMonth=11/24',
      );

      expect(response.status).toBe(500);
      expect(response.text).toBe('Unmapped error: Error');
    });
  });
});
