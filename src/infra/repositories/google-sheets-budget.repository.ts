/* eslint-disable camelcase */
import { ReferenceMonth } from '@/app/entities/reference-month';
import { BudgetRepository } from '@/app/repositories/budget.repository';
import { google, sheets_v4 } from 'googleapis';

export class GoogleSheetsBudgetRepository implements BudgetRepository {
  private readonly sheetsConnection: sheets_v4.Sheets;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheetsConnection = google.sheets({
      auth,
      version: 'v4',
    });
  }

  async getReferenceMonths(): Promise<ReferenceMonth[]> {
    const spreadsheet = await this.sheetsConnection.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });

    const referenceMonths = spreadsheet.data.sheets?.map((sheet) => {
      return ReferenceMonth.create({
        value: sheet.properties?.title as string,
      });
    });

    if (!referenceMonths) {
      return [];
    }

    return referenceMonths || [];
  }
}
