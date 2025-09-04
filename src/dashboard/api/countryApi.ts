import type { CountryData, ApiResponse } from './types';
import { mockApiEndpoints } from './mockApi';

// Mock API function - fetches from JSON file
export const getCountryData = async (
  includeExtended: boolean = false
): Promise<ApiResponse<CountryData[]>> => {
  try {
    const params = includeExtended ? 'extended=true' : undefined;
    const response = await mockApiEndpoints.getCountries(params);
    return response as ApiResponse<CountryData[]>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get top countries with detailed metrics
export const getTopCountries = async (
  limit: number = 10
): Promise<ApiResponse<Array<{
  country: string;
  users: number;
  sessions: number;
  percentage: number;
  growth: number;
  revenue: number;
}>>> => {
  try {
    const params = `limit=${limit}`;
    const response = await mockApiEndpoints.getTopCountries(params);
    return response as ApiResponse<Array<{
      country: string;
      users: number;
      sessions: number;
      percentage: number;
      growth: number;
      revenue: number;
    }>>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get country analytics summary
export const getCountryAnalyticsSummary = async (): Promise<ApiResponse<{
  totalCountries: number;
  topCountryPercentage: number;
  internationalPercentage: number;
  growthRate: number;
}>> => {
  // For summary, we can derive from the main country data
  try {
    const response = await getCountryData();
    if (response.success && response.data) {
      const data = response.data;
      return {
        data: {
          totalCountries: 45,
          topCountryPercentage: data[0]?.percentage || 0,
          internationalPercentage: 85,
          growthRate: 12.8
        },
        success: true,
        message: 'Country analytics summary retrieved successfully'
      };
    }
    throw new Error('Failed to get country data for summary');
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
export const getCountryData = async (
  includeExtended: boolean = false
): Promise<ApiResponse<CountryData[]>> => {
  try {
    const params = new URLSearchParams({
      extended: includeExtended.toString()
    });
    
    const response = await fetch(`/api/dashboard/countries?${params}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch country data');
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

export const getTopCountries = async (
  limit: number = 10
): Promise<ApiResponse<Array<{
  country: string;
  users: number;
  sessions: number;
  percentage: number;
  growth: number;
  revenue: number;
}>>> => {
  try {
    const response = await fetch(`/api/dashboard/countries/top?limit=${limit}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch top countries');
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
