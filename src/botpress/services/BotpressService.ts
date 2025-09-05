import type { 
  BotpressConfig, 
  BotpressTableRow, 
  BotpressTableResponse 
} from '../types';

export class BotpressService {
  private config: BotpressConfig;
  private baseUrl: string;

  constructor(config: BotpressConfig) {
    this.config = config;
    this.baseUrl = 'https://api.botpress.cloud';
  }

  /**
   * Create table rows in Botpress
   */
  async createTableRows(tableName: string, rows: BotpressTableRow[]): Promise<BotpressTableResponse> {
    const url = `${this.baseUrl}/v1/tables/${tableName}/rows`;
    
    const requestBody = {
      rows: rows.map(row => ({
        ...row
      }))
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.token}`,
          'Content-Type': 'application/json',
          'x-bot-id': this.config.botId,
          'x-workspace-id': this.config.workspaceId,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Botpress API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      return {
        success: true,
        insertedRows: result.rows || result.insertedRows,
        message: result.message || 'Rows created successfully'
      };
    } catch (error) {
      console.error('Failed to create table rows in Botpress:', error);
      throw error;
    }
  }

  /**
   * Get table rows from Botpress
   */
  async getTableRows(tableName: string): Promise<BotpressTableRow[]> {
    const url = `${this.baseUrl}/v1/tables/${tableName}/rows`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.token}`,
          'x-bot-id': this.config.botId,
          'x-workspace-id': this.config.workspaceId,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get table rows: ${response.status}`);
      }

      const result = await response.json();
      return result.rows || result;
    } catch (error) {
      console.error('Failed to get table rows from Botpress:', error);
      throw error;
    }
  }

  /**
   * Clear all rows from a table
   */
  async clearTable(tableName: string): Promise<void> {
    try {
      // First get all existing rows
      const existingRows = await this.getTableRows(tableName);
      
      // Delete each row (Botpress doesn't have bulk delete, so we need to delete one by one)
      for (const row of existingRows) {
        if (row.id) {
          await this.deleteTableRow(tableName, String(row.id));
        }
      }
    } catch (error) {
      console.error(`Failed to clear table ${tableName}:`, error);
      // Don't throw error - just log it, as the table might not exist yet
    }
  }

  /**
   * Delete a specific table row
   */
  async deleteTableRow(tableName: string, rowId: string): Promise<void> {
    const url = `${this.baseUrl}/v1/tables/${tableName}/rows/${rowId}`;
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.config.token}`,
          'x-bot-id': this.config.botId,
          'x-workspace-id': this.config.workspaceId,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete table row: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to delete table row from Botpress:', error);
      throw error;
    }
  }

  /**
   * Sync table data - clears existing data and uploads new data
   * This prevents duplicates by ensuring we start fresh
   */
  async syncTableData(tableName: string, rows: BotpressTableRow[]): Promise<BotpressTableResponse> {
    try {
      // Clear existing data first
      await this.clearTable(tableName);
      
      // Upload new data
      return await this.createTableRows(tableName, rows);
    } catch (error) {
      console.error(`Failed to sync table data for ${tableName}:`, error);
      throw error;
    }
  }
}
