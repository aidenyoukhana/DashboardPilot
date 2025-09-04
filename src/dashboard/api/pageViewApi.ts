import type { PageViewData, ApiResponse } from './types';
import { mockApiEndpoints } from './mockApi';

// Mock API function - fetches from JSON file
export const getPageViewData = async (
  period: 'monthly' | 'weekly' | 'daily' = 'monthly',
  months?: number
): Promise<ApiResponse<PageViewData[]>> => {
  try {
    // Build query params
    const params = new URLSearchParams({
      period,
      ...(months && { months: months.toString() })
    }).toString();
    
    const response = await mockApiEndpoints.getPageViews(params);
    return response as ApiResponse<PageViewData[]>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get page view summary
export const getPageViewSummary = async (): Promise<ApiResponse<{
  totalViews: number;
  totalDownloads: number;
  averageViewsPerMonth: number;
  growthRate: number;
  conversionRate: number;
}>> => {
  try {
    const response = await mockApiEndpoints.getPageViewsSummary();
    return response as ApiResponse<{
      totalViews: number;
      totalDownloads: number;
      averageViewsPerMonth: number;
      growthRate: number;
      conversionRate: number;
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
export const getPageViewData = async (
  period: 'monthly' | 'weekly' | 'daily' = 'monthly',
  months?: number
): Promise<ApiResponse<PageViewData[]>> => {
  try {
    const params = new URLSearchParams({
      period,
      ...(months && { months: months.toString() })
    });
    
    const response = await fetch(`/api/dashboard/page-views?${params}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch page view data');
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

export const getPageViewSummary = async (): Promise<ApiResponse<{
  totalViews: number;
  totalDownloads: number;
  averageViewsPerMonth: number;
  growthRate: number;
  conversionRate: number;
}>> => {
  try {
    const response = await fetch('/api/dashboard/page-views/summary');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch page view summary');
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
