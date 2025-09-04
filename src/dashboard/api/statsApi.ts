import type { StatCardData, ApiResponse } from './types';
import { mockApiEndpoints } from './mockApi';

// Mock API function - fetches from JSON file
export const getStatCards = async (): Promise<ApiResponse<StatCardData[]>> => {
  try {
    const response = await mockApiEndpoints.getStats();
    return response as ApiResponse<StatCardData[]>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Real API function template (commented out)
/*
export const getStatCards = async (): Promise<ApiResponse<StatCardData[]>> => {
  try {
    const response = await fetch('/api/dashboard/stats');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch statistics');
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
