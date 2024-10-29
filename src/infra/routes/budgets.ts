import { FetchReferenceMonths } from '@/app/services/budget/fetch-reference-months';
import { GoogleSheetsBudgetRepository } from '../repositories/google-sheets-budget.repository';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { FetchBudgetSummary } from '@/app/services/budget/fetch-budget-summary';

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

      return fetchBudgetSummary.execute(referenceMonth);
    },
  );
}
