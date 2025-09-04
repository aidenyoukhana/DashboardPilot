import type { AlertData, ApiResponse } from './types';
import { mockApiEndpoints } from './mockApi';

// Mock API function - fetches from JSON file
export const getAlerts = async (
  severity?: 'error' | 'warning' | 'info' | 'success',
  limit?: number,
  unreadOnly?: boolean
): Promise<ApiResponse<AlertData[]>> => {
  try {
    const params = new URLSearchParams();
    if (severity) params.append('severity', severity);
    if (limit) params.append('limit', limit.toString());
    if (unreadOnly) params.append('unreadOnly', 'true');
    
    const queryString = params.toString();
    const response = await mockApiEndpoints.getAlerts(queryString || undefined);
    return response as ApiResponse<AlertData[]>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get alert summary/counts
export const getAlertSummary = async (): Promise<ApiResponse<{
  total: number;
  unread: number;
  bySeverity: {
    error: number;
    warning: number;
    info: number;
    success: number;
  };
}>> => {
  try {
    const response = await mockApiEndpoints.getAlertsSummary();
    return response as ApiResponse<{
      total: number;
      unread: number;
      bySeverity: {
        error: number;
        warning: number;
        info: number;
        success: number;
      };
    }>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Mark alert as read
export const markAlertAsRead = async (
  alertId: string
): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    // Simulate marking alert as read
    return {
      data: { success: true },
      success: true,
      message: `Alert ${alertId} marked as read`
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Mark all alerts as read
export const markAllAlertsAsRead = async (): Promise<ApiResponse<{ 
  success: boolean; 
  count: number 
}>> => {
  try {
    // Simulate marking all alerts as read
    return {
      data: { success: true, count: 5 },
      success: true,
      message: 'All alerts marked as read'
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Dismiss/delete an alert
export const dismissAlert = async (
  alertId: string
): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    // Simulate dismissing an alert
    return {
      data: { success: true },
      success: true,
      message: `Alert ${alertId} dismissed successfully`
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Create a new alert
export const createAlert = async (
  alertData: Omit<AlertData, 'id' | 'timestamp'>
): Promise<ApiResponse<AlertData>> => {
  try {
    const newAlert: AlertData = {
      ...alertData,
      id: `alert_${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    return {
      data: newAlert,
      success: true,
      message: 'Alert created successfully'
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
