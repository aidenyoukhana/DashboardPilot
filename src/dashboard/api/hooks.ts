// Custom React hooks for Dashboard API calls
import { useState, useEffect, useCallback } from 'react';
import type { 
  StatCardData, 
  PageAnalyticsData, 
  SessionData, 
  PageViewData, 
  CountryData, 
  TreeViewItem, 
  NavigationItem, 
  AlertData
} from './types';

import {
  getStatCards,
  getPageAnalytics,
  getSessionData,
  getSessionSummary,
  getPageViewData,
  getPageViewSummary,
  getCountryData,
  getTopCountries,
  getTreeViewData,
  getNavigationData,
  getAlerts,
  getAlertSummary
} from './index';

// Generic hook interface
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Hook for StatCards data
export function useStatCards(): UseApiState<StatCardData[]> {
  const [data, setData] = useState<StatCardData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getStatCards();
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load statistics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Page Analytics data with pagination
export function usePageAnalytics(
  page: number = 1,
  pageSize: number = 20,
  sortBy?: string,
  filterBy?: { status?: 'Online' | 'Offline'; search?: string }
): UseApiState<{ items: PageAnalyticsData[], total: number, page: number, pageSize: number }> {
  const [data, setData] = useState<{ items: PageAnalyticsData[], total: number, page: number, pageSize: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getPageAnalytics(page, pageSize, sortBy, filterBy);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load page analytics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortBy, filterBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Session data
export function useSessionData(dateRange?: { start: string; end: string }): UseApiState<SessionData[]> {
  const [data, setData] = useState<SessionData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getSessionData(dateRange);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load session data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Session summary
export function useSessionSummary(): UseApiState<{
  totalSessions: number;
  desktopPercentage: number;
  mobilePercentage: number;
  tabletPercentage: number;
  growthRate: number;
}> {
  const [data, setData] = useState<{
    totalSessions: number;
    desktopPercentage: number;
    mobilePercentage: number;
    tabletPercentage: number;
    growthRate: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getSessionSummary();
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load session summary');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Page View data
export function usePageViewData(
  period: 'monthly' | 'weekly' | 'daily' = 'monthly',
  months?: number
): UseApiState<PageViewData[]> {
  const [data, setData] = useState<PageViewData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getPageViewData(period, months);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load page view data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [period, months]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Page View summary
export function usePageViewSummary(): UseApiState<{
  totalViews: number;
  totalDownloads: number;
  averageViewsPerMonth: number;
  growthRate: number;
  conversionRate: number;
}> {
  const [data, setData] = useState<{
    totalViews: number;
    totalDownloads: number;
    averageViewsPerMonth: number;
    growthRate: number;
    conversionRate: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getPageViewSummary();
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load page view summary');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Country data
export function useCountryData(includeExtended: boolean = false): UseApiState<CountryData[]> {
  const [data, setData] = useState<CountryData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getCountryData(includeExtended);
      
      if (response.success) {
        setData(response.data as CountryData[]);
      } else {
        setError(response.message || 'Failed to load country data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [includeExtended]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Top Countries data
export function useTopCountries(limit: number = 10): UseApiState<Array<{
  country: string;
  users: number;
  sessions: number;
  percentage: number;
  growth: number;
  revenue: number;
}>> {
  const [data, setData] = useState<Array<{
    country: string;
    users: number;
    sessions: number;
    percentage: number;
    growth: number;
    revenue: number;
  }> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getTopCountries(limit);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load top countries');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Tree View data
export function useTreeViewData(expandLevel?: number): UseApiState<TreeViewItem[]> {
  const [data, setData] = useState<TreeViewItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getTreeViewData(expandLevel);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load tree view data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [expandLevel]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Navigation data
export function useNavigationData(): UseApiState<NavigationItem[]> {
  const [data, setData] = useState<NavigationItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getNavigationData();
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load navigation data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Alerts data
export function useAlerts(
  severity?: 'error' | 'warning' | 'info' | 'success',
  limit?: number,
  unreadOnly?: boolean
): UseApiState<AlertData[]> {
  const [data, setData] = useState<AlertData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAlerts(severity, limit, unreadOnly);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load alerts');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [severity, limit, unreadOnly]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for Alert summary
export function useAlertSummary(): UseApiState<{
  total: number;
  unread: number;
  bySeverity: {
    error: number;
    warning: number;
    info: number;
    success: number;
  };
}> {
  const [data, setData] = useState<{
    total: number;
    unread: number;
    bySeverity: {
      error: number;
      warning: number;
      info: number;
      success: number;
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAlertSummary();
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load alert summary');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
