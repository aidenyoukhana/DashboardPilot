// Main API exports for Dashboard components
// This file serves as the main entry point for all dashboard APIs

// Export all types
export * from './types';

// Export API functions
export * from './statsApi';
export * from './pageAnalyticsApi';
export * from './sessionApi';
export * from './pageViewApi';
export * from './countryApi';
export * from './treeViewApi';
export * from './navigationApi';
export * from './alertApi';

// Import for re-export
import { getStatCards } from './statsApi';
import { getPageAnalytics } from './pageAnalyticsApi';
import { getSessionData, getSessionSummary } from './sessionApi';
import { getPageViewData, getPageViewSummary } from './pageViewApi';
import { getCountryData, getTopCountries } from './countryApi';
import { getTreeViewData, getTreeBranchData } from './treeViewApi';
import { getNavigationData, getBreadcrumbs, getUserMenuData } from './navigationApi';
import { getAlerts, getAlertSummary, markAlertAsRead, dismissAlert } from './alertApi';

// API configuration and utilities
export const API_CONFIG = {
  baseUrl: '/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000
};

// Generic error handler for all APIs
export const handleApiError = (error: unknown): { error: string; code: number; message: string } => {
  if (error && typeof error === 'object' && 'error' in error) {
    return error as { error: string; code: number; message: string };
  }
  
  return {
    error: 'UNKNOWN_ERROR',
    code: 500,
    message: error instanceof Error ? error.message : 'An unknown error occurred'
  };
};

// Generic retry function for failed API calls
export const retryApiCall = async <T>(
  apiCall: () => Promise<T>,
  maxRetries: number = API_CONFIG.retryAttempts,
  delay: number = API_CONFIG.retryDelay
): Promise<T> => {
  let lastError: unknown;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError;
};

// Utility to check if we're in mock mode
export const isMockMode = (): boolean => {
  // Default to true for mock mode during development
  return true;
};

// Toggle between mock and real APIs
export const createApiClient = (useMock: boolean = isMockMode()) => {
  if (useMock) {
    // Return mock API functions (current implementation)
    return {
      getStatCards,
      getPageAnalytics,
      getSessionData,
      getSessionSummary,
      getPageViewData,
      getPageViewSummary,
      getCountryData,
      getTopCountries,
      getTreeViewData,
      getTreeBranchData,
      getNavigationData,
      getBreadcrumbs,
      getUserMenuData,
      getAlerts,
      getAlertSummary,
      markAlertAsRead,
      dismissAlert
    };
  } else {
    // Return real API functions (would be implemented when switching to real APIs)
    throw new Error('Real API implementation not yet available. Set REACT_APP_USE_MOCK_API=true to use mock data.');
  }
};
