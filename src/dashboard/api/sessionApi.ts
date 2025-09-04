import type { SessionData, ApiResponse } from './types';
import { mockApiEndpoints } from './mockApi';

// Mock API function - fetches from JSON file
export const getSessionData = async (
  dateRange?: { start: string; end: string }
): Promise<ApiResponse<SessionData[]>> => {
  try {
    // Build query params if dateRange is provided
    const params = dateRange ? 
      `start=${dateRange.start}&end=${dateRange.end}` : 
      undefined;
    
    const response = await mockApiEndpoints.getSessions(params);
    return response as ApiResponse<SessionData[]>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get session summary statistics
export const getSessionSummary = async (): Promise<ApiResponse<{
  totalSessions: number;
  desktopPercentage: number;
  mobilePercentage: number;
  tabletPercentage: number;
  growthRate: number;
}>> => {
  try {
    const response = await mockApiEndpoints.getSessionsSummary();
    return response as ApiResponse<{
      totalSessions: number;
      desktopPercentage: number;
      mobilePercentage: number;
      tabletPercentage: number;
      growthRate: number;
    }>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Real API function templates (commented out)
/*
export const getSessionData = async (
  dateRange?: { start: string; end: string }
): Promise<ApiResponse<SessionData[]>> => {
  try {
    const params = new URLSearchParams();
    if (dateRange) {
      params.append('start', dateRange.start);
      params.append('end', dateRange.end);
    }
    
    const response = await fetch(`/api/dashboard/sessions?${params}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch session data');
    }
    
    return {
      data: data,
      success: true
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const getSessionSummary = async (): Promise<ApiResponse<{
  totalSessions: number;
  desktopPercentage: number;
  mobilePercentage: number;
  tabletPercentage: number;
  growthRate: number;
}>> => {
  try {
    const response = await fetch('/api/dashboard/sessions/summary');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch session summary');
    }
    
    return {
      data: data,
      success: true
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
*/
