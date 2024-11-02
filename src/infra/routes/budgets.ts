/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchReferenceMonths } from '@/app/services/budget/fetch-reference-months';
import { GoogleSheetsBudgetRepository } from '../repositories/google-sheets-budget.repository';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { FetchBudgetSummary } from '@/app/services/budget/fetch-budget-summary';
import { FetchBudgetExpenses } from '@/app/services/budget/fetch-budget-expenses';
import { ResourceNotFoundError } from '@/app/errors/resource-not-found';

export function budgetsRoutes(app: FastifyInstance) {
  const budgetRepository = new GoogleSheetsBudgetRepository();

  app.get('/budgets/reference-months', async () => {
    const fetchReferenceMonths = new FetchReferenceMonths(budgetRepository);

    const referenceMonths = await fetchReferenceMonths.execute();

    return referenceMonths;
  });

  app.get(
    '/budgets/summary',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { referenceMonth } = req.query as { referenceMonth: string };

      if (!referenceMonth) {
        return reply.status(400).send('Reference month must be provided');
      }

      const fetchBudgetSummary = new FetchBudgetSummary(budgetRepository);

      try {
        const budgetSummary = await fetchBudgetSummary.execute(referenceMonth);

        return budgetSummary.map();
      } catch (error: any) {
        if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send(error.message);
        } else {
          return reply.status(500).send(error.message);
        }
      }
    },
  );

  app.get(
    '/budgets/expenses',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { referenceMonth } = req.query as { referenceMonth: string };

      if (!referenceMonth) {
        return reply.status(400).send('Reference month must be provided');
      }

      const fetchBudgetExpenses = new FetchBudgetExpenses(budgetRepository);

      const expenses = await fetchBudgetExpenses.execute(referenceMonth);

      return expenses.map((expense) => expense.map());
    },
  );
}
