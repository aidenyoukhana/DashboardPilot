import type { PageAnalyticsData, ApiResponse } from './types';
import { mockApiEndpoints } from './mockApi';

interface PageAnalyticsFilter {
  status?: 'Online' | 'Offline';
  search?: string;
  [key: string]: unknown;
}

// Mock API function - fetches from JSON file
export const getPageAnalytics = async (
  page: number = 1,
  pageSize: number = 20,
  sortBy?: string,
  filterBy?: PageAnalyticsFilter
): Promise<ApiResponse<{ items: PageAnalyticsData[], total: number, page: number, pageSize: number }>> => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    if (sortBy) params.append('sortBy', sortBy);
    if (filterBy) params.append('filter', JSON.stringify(filterBy));
    
    const queryString = params.toString();
    const response = await mockApiEndpoints.getPageAnalytics(queryString);
    return response as ApiResponse<{ items: PageAnalyticsData[], total: number, page: number, pageSize: number }>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
