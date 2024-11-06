/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchReferenceMonthsService } from '@/app/services/budget/fetch-reference-months.service';
import { GoogleSheetsBudgetRepository } from '../repositories/google-sheets-budget.repository';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { FetchBudgetSummaryService } from '@/app/services/budget/fetch-budget-summary.service';
import { FetchBudgetExpensesService } from '@/app/services/budget/fetch-budget-expenses.service';
import { FetchBudgetGoalsService } from '@/app/services/budget/fetch-budget-goals.service';

export function budgetsRoutes(app: FastifyInstance) {
  const budgetRepository = new GoogleSheetsBudgetRepository();

  app.get('/budgets/reference-months', async () => {
    const fetchReferenceMonthsService = new FetchReferenceMonthsService(
      budgetRepository,
    );

    const referenceMonths = await fetchReferenceMonthsService.execute();

    return referenceMonths;
  });

  app.get(
    '/budgets/summary',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { referenceMonth } = req.query as { referenceMonth: string };

      if (!referenceMonth) {
        return reply.status(400).send('Reference month must be provided');
      }

      const fetchBudgetSummaryService = new FetchBudgetSummaryService(
        budgetRepository,
      );

      const budgetSummary =
        await fetchBudgetSummaryService.execute(referenceMonth);

      return budgetSummary.map();
    },
  );

  app.get(
    '/budgets/expenses',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { referenceMonth } = req.query as { referenceMonth: string };

      if (!referenceMonth) {
        return reply.status(400).send('Reference month must be provided');
      }

      const fetchBudgetExpensesService = new FetchBudgetExpensesService(
        budgetRepository,
      );

      const expenses = await fetchBudgetExpensesService.execute(referenceMonth);

      return expenses.map((expense) => expense.map());
    },
  );

  app.get(
    '/budgets/goals',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { referenceMonth } = req.query as { referenceMonth: string };

      if (!referenceMonth) {
        return reply.status(400).send('Reference month must be provided');
      }

      const fetchBudgetGoalsService = new FetchBudgetGoalsService(
        budgetRepository,
      );

      const goals = await fetchBudgetGoalsService.execute(referenceMonth);

      return goals.map((expense) => expense.map());
    },
  );
}
