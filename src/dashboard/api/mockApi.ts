// Mock API utility for fetching JSON data
// This simulates real API calls by fetching from local JSON files

import type { ApiResponse } from './types';

// Simulate network delay for realistic API behavior
const simulateNetworkDelay = (min: number = 200, max: number = 800): Promise<void> => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Generic mock API fetch function
export const mockApiFetch = async <T>(
  endpoint: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: Record<string, unknown>;
    delay?: { min: number; max: number };
  }
): Promise<ApiResponse<T>> => {
  const { method = 'GET', delay = { min: 200, max: 800 } } = options || {};
  
  try {
    // Simulate network delay
    await simulateNetworkDelay(delay.min, delay.max);
    
    // Map endpoint to JSON file
    const jsonFile = getJsonFileForEndpoint(endpoint);
    
    if (!jsonFile) {
      throw new Error(`No mock data found for endpoint: ${endpoint}`);
    }
    
    // For non-GET requests, simulate success without actually fetching
    if (method !== 'GET') {
      return {
        success: true,
        data: {} as T,
        message: `${method} request successful`
      };
    }
    
    // Import the JSON file dynamically
    const mockData = await import(`./mockData/${jsonFile}`);
    
    // Return the mock data in API response format
    return mockData.default;
    
  } catch (error) {
    // Simulate API error response
    throw {
      error: 'MOCK_API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Mock API error occurred'
    };
  }
};

// Map API endpoints to JSON files
const getJsonFileForEndpoint = (endpoint: string): string | null => {
  const endpointMap: Record<string, string> = {
    // Stats endpoints
    '/api/dashboard/stats': 'statsData.json',
    
    // Page analytics endpoints
    '/api/dashboard/page-analytics': 'pageAnalyticsData.json',
    
    // Session endpoints
    '/api/dashboard/sessions': 'sessionData.json',
    '/api/dashboard/sessions/summary': 'sessionSummaryData.json',
    
    // Page views endpoints
    '/api/dashboard/page-views': 'pageViewData.json',
    '/api/dashboard/page-views/summary': 'pageViewSummaryData.json',
    
    // Country endpoints
    '/api/dashboard/countries': 'countryData.json',
    '/api/dashboard/countries/top': 'topCountriesData.json',
    
    // Tree view endpoints
    '/api/dashboard/tree-view': 'treeViewData.json',
    
    // Navigation endpoints
    '/api/navigation': 'navigationData.json',
    
    // Alert endpoints
    '/api/alerts': 'alertsData.json',
    '/api/alerts/summary': 'alertSummaryData.json'
  };
  
  // Handle parameterized endpoints
  for (const [pattern, file] of Object.entries(endpointMap)) {
    if (endpoint.startsWith(pattern.split('?')[0])) {
      return file;
    }
  }
  
  return endpointMap[endpoint] || null;
};

// Specific mock API functions for each endpoint
export const mockApiEndpoints = {
  // Stats
  getStats: () => mockApiFetch('/api/dashboard/stats'),
  
  // Page Analytics
  getPageAnalytics: (params?: string) => 
    mockApiFetch(`/api/dashboard/page-analytics${params ? `?${params}` : ''}`),
  
  // Sessions
  getSessions: (params?: string) => 
    mockApiFetch(`/api/dashboard/sessions${params ? `?${params}` : ''}`),
  getSessionsSummary: () => 
    mockApiFetch('/api/dashboard/sessions/summary'),
  
  // Page Views
  getPageViews: (params?: string) => 
    mockApiFetch(`/api/dashboard/page-views${params ? `?${params}` : ''}`),
  getPageViewsSummary: () => 
    mockApiFetch('/api/dashboard/page-views/summary'),
  
  // Countries
  getCountries: (params?: string) => 
    mockApiFetch(`/api/dashboard/countries${params ? `?${params}` : ''}`),
  getTopCountries: (params?: string) => 
    mockApiFetch(`/api/dashboard/countries/top${params ? `?${params}` : ''}`),
  
  // Tree View
  getTreeView: (params?: string) => 
    mockApiFetch(`/api/dashboard/tree-view${params ? `?${params}` : ''}`),
  
  // Navigation
  getNavigation: (params?: string) => 
    mockApiFetch(`/api/navigation${params ? `?${params}` : ''}`),
  
  // Alerts
  getAlerts: (params?: string) => 
    mockApiFetch(`/api/alerts${params ? `?${params}` : ''}`),
  getAlertsSummary: () => 
    mockApiFetch('/api/alerts/summary'),
  
  // CRUD operations (simulate success responses)
  post: (endpoint: string, data: Record<string, unknown>) => 
    mockApiFetch(endpoint, { method: 'POST', body: data }),
  put: (endpoint: string, data: Record<string, unknown>) => 
    mockApiFetch(endpoint, { method: 'PUT', body: data }),
  patch: (endpoint: string, data: Record<string, unknown>) => 
    mockApiFetch(endpoint, { method: 'PATCH', body: data }),
  delete: (endpoint: string) => 
    mockApiFetch(endpoint, { method: 'DELETE' })
};

// Environment check for mock vs real API
export const shouldUseMockApi = (): boolean => {
  // Always use mock API for now (can be configured later)
  return true;
};

// API client that switches between mock and real APIs
export const createApiClient = () => {
  if (shouldUseMockApi()) {
    return mockApiEndpoints;
  } else {
    // Return real API client when available
    throw new Error('Real API client not implemented yet. Using mock API.');
  }
};
