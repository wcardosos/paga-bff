import { FetchReferenceMonths } from '@/app/services/budget/fetch-reference-months';
import { GoogleSheetsBudgetRepository } from '../repositories/google-sheets-budget.repository';
import { FastifyInstance } from 'fastify';

export function budgetsRoutes(app: FastifyInstance) {
  app.get('/budgets/reference-months', async () => {
    const budgetRepository = new GoogleSheetsBudgetRepository();
    const fetchReferenceMonths = new FetchReferenceMonths(budgetRepository);

    const referenceMonths = await fetchReferenceMonths.execute();

    return referenceMonths;
  });
}
