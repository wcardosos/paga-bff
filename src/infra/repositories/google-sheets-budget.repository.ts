/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import {
  BudgetSummary,
  BudgetSummaryProps,
} from '@/app/entities/budget-summary';
import { ReferenceMonth } from '@/app/entities/reference-month';
import { BudgetRepository } from '@/app/repositories/budget.repository';
import { google, sheets_v4 } from 'googleapis';
import { env } from '@/infra/config/env';
import {
  Expense,
  ExpenseCategory,
  ExpenseStatus,
} from '@/app/entities/expense';
import { ResourceNotFoundError } from '@/app/errors/resource-not-found';
import { UnmappedError } from '@/app/errors/unmapped';
import { Goal } from '@/app/entities/goal';

export class GoogleSheetsBudgetRepository implements BudgetRepository {
  private readonly sheetsConnection: sheets_v4.Sheets;

  private readonly EXPENSE_STATUS_MAPPING: Record<string, ExpenseStatus> = {
    Pago: 'paid',
    'Não pago': 'unpaid',
    Separado: 'separated',
  };

  private readonly EXPENSE_CATEGORY_MAPPING: Record<string, ExpenseCategory> = {
    Lazer: 'leisure',
    Essencial: 'essential',
    Investimentos: 'investments',
  };

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheetsConnection = google.sheets({
      auth,
      version: 'v4',
    });
  }

  async getReferenceMonths(): Promise<ReferenceMonth[]> {
    const spreadsheet = await this.getSpreadsheet();

    const referenceMonths = spreadsheet.sheets?.map((sheet) => {
      return ReferenceMonth.create({
        value: sheet.properties?.title as string,
      });
    });

    if (!referenceMonths) {
      return [];
    }

    return referenceMonths || [];
  }

  async getSummary(
    referenceMonth: ReferenceMonth,
  ): Promise<BudgetSummary | null> {
    const response = await this.fetchValuesFromRange(
      `${referenceMonth.value}!B1:B6`,
      'Summary',
    );

    const { values } = response.data;

    if (!values) return null;

    const [
      rawIncome,
      rawExpenses,
      rawBalance,
      rawUnpaid,
      rawPaid,
      rawSeparated,
    ] = values.flat();

    const summaryValues = this.normalizeValues(
      rawIncome,
      rawExpenses,
      rawBalance,
      rawPaid,
      rawUnpaid,
      rawSeparated,
    );

    if (!summaryValues) return null;

    return BudgetSummary.create(summaryValues);
  }

  async getExpenses(referenceMonth: ReferenceMonth): Promise<Expense[]> {
    const expensesResponse = await this.fetchValuesFromRange(
      `${referenceMonth.value}!D2:I`,
      'Expenses',
    );

    const { values } = expensesResponse.data;

    const expenses = values?.map(
      ([description, amount, dueDay, status, category]) => {
        return Expense.create({
          description: description as string,
          amount: amount ? parseFloat(amount.replace(',', '.')) : 0,
          dueDay: Number(dueDay) || null,
          status: this.parseStatus(status),
          category: this.parseCategory(category),
        });
      },
    );

    return expenses || [];
  }

  async getGoals(referenceMonth: ReferenceMonth): Promise<Goal[]> {
    const goalsResponse = await this.fetchValuesFromRange(
      `${referenceMonth.value}!J3:M`,
      'Goals',
    );

    const { values } = goalsResponse.data;

    const goals = values?.map(([category, amount, currentAmount, progress]) => {
      return Goal.create({
        category,
        amount: amount ? parseFloat(amount.replace(',', '.')) : 0,
        currentAmount: currentAmount
          ? parseFloat(currentAmount.replace(',', '.'))
          : 0,
        progress: progress ? parseFloat(progress.replace(',', '.')) : 0,
      });
    });

    return goals || [];
  }

  private async getSpreadsheet() {
    const response = await this.sheetsConnection.spreadsheets.get({
      spreadsheetId: env.GOOGLE_SHEET_ID,
    });

    return response.data;
  }

  private async fetchValuesFromRange(range: string, context: string) {
    try {
      return await this.sheetsConnection.spreadsheets.values.get({
        spreadsheetId: env.GOOGLE_SHEET_ID,
        range,
      });
    } catch (error: any) {
      const errorType = this.parseErrorMessage(
        error.response?.data?.error?.message,
      );

      if (errorType === 'RANGE_NOT_FOUND') {
        throw new ResourceNotFoundError(context);
      } else {
        throw new UnmappedError(error);
      }
    }
  }

  private normalizeValues(
    rawIncome: string,
    rawExpenses: string,
    rawBalance: string,
    rawPaid: string,
    rawUnpaid: string,
    rawSeparated: string,
  ): BudgetSummaryProps | undefined {
    if (
      !rawIncome &&
      !rawExpenses &&
      !rawBalance &&
      !rawPaid &&
      !rawUnpaid &&
      !rawSeparated
    ) {
      return;
    }

    return {
      income: rawIncome ? parseFloat(rawIncome.replace(',', '.')) : 0,
      expenses: rawExpenses ? parseFloat(rawExpenses.replace(',', '.')) : 0,
      balance: rawBalance ? parseFloat(rawBalance.replace(',', '.')) : 0,
      paid: rawPaid ? parseFloat(rawPaid.replace(',', '.')) : 0,
      unpaid: rawUnpaid ? parseFloat(rawUnpaid.replace(',', '.')) : 0,
      separated: rawSeparated ? parseFloat(rawSeparated.replace(',', '.')) : 0,
    };
  }

  private parseStatus(status: string): ExpenseStatus | null {
    return this.EXPENSE_STATUS_MAPPING[status] || null;
  }

  private parseCategory(category: string): ExpenseCategory | null {
    return this.EXPENSE_CATEGORY_MAPPING[category] || null;
  }

  private parseErrorMessage(errorMessage: string): 'RANGE_NOT_FOUND' | null {
    if (!errorMessage) return null;

    return /Unable to parse range:/.test(errorMessage)
      ? 'RANGE_NOT_FOUND'
      : null;
  }
}
