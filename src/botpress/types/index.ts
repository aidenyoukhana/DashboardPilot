// Botpress API types and interfaces

export interface BotpressConfig {
  botId: string;
  token: string;
  workspaceId: string;
  baseUrl?: string;
}

export interface BotpressTableRow {
  [key: string]: string | number | boolean | null;
}

export interface BotpressTableResponse {
  success: boolean;
  insertedRows: BotpressTableRow[];
  message?: string;
  errors?: string[];
}

export interface UploadProgress {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  message: string;
  error?: string;
}

// Dashboard data interfaces
export interface DashboardDataExport {
  type: 'employees' | 'analytics' | 'stats' | 'sessions';
  data: Record<string, unknown>[];
  metadata: {
    exportDate: string;
    totalRecords: number;
    source: string;
  };
}
