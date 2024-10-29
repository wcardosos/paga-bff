/* eslint-disable camelcase */
import {
  BudgetSummary,
  BudgetSummaryProps,
} from '@/app/entities/budget-summary';
import { ReferenceMonth } from '@/app/entities/reference-month';
import { BudgetRepository } from '@/app/repositories/budget.repository';
import { google, sheets_v4 } from 'googleapis';
import { env } from '@/infra/config/env';

export class GoogleSheetsBudgetRepository implements BudgetRepository {
  private readonly sheetsConnection: sheets_v4.Sheets;

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
    const response = await this.sheetsConnection.spreadsheets.values.get({
      spreadsheetId: env.GOOGLE_SHEET_ID,
      range: `${referenceMonth.value}!B1:B6`,
    });

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

  private async getSpreadsheet() {
    const response = await this.sheetsConnection.spreadsheets.get({
      spreadsheetId: env.GOOGLE_SHEET_ID,
    });

    return response.data;
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
}
