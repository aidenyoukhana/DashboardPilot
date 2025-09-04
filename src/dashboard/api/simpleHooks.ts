// Simple React hooks for Dashboard API calls
import { useState, useEffect } from 'react';
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
  getPageViewData,
  getCountryData,
  getTreeViewData,
  getNavigationData,
  getAlerts
} from './index';

// Generic hook interface
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Simple hook for StatCards data
export function useStatCards(): UseApiState<StatCardData[]> {
  const [data, setData] = useState<StatCardData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    getStatCards()
      .then(response => {
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Failed to load statistics');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Simple hook for Page Analytics data
export function usePageAnalytics(): UseApiState<{ items: PageAnalyticsData[], total: number, page: number, pageSize: number }> {
  const [data, setData] = useState<{ items: PageAnalyticsData[], total: number, page: number, pageSize: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    getPageAnalytics()
      .then(response => {
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Failed to load page analytics');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Simple hook for Session data
export function useSessionData(): UseApiState<SessionData[]> {
  const [data, setData] = useState<SessionData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    getSessionData()
      .then(response => {
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Failed to load session data');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Simple hook for Page View data
export function usePageViewData(): UseApiState<PageViewData[]> {
  const [data, setData] = useState<PageViewData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    getPageViewData()
      .then(response => {
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Failed to load page view data');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Simple hook for Country data
export function useCountryData(): UseApiState<CountryData[]> {
  const [data, setData] = useState<CountryData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    getCountryData()
      .then(response => {
        if (response.success) {
          setData(response.data as CountryData[]);
        } else {
          setError(response.message || 'Failed to load country data');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Simple hook for Tree View data
export function useTreeViewData(): UseApiState<TreeViewItem[]> {
  const [data, setData] = useState<TreeViewItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    getTreeViewData()
      .then(response => {
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Failed to load tree view data');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Simple hook for Navigation data
export function useNavigationData(): UseApiState<NavigationItem[]> {
  const [data, setData] = useState<NavigationItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    getNavigationData()
      .then(response => {
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Failed to load navigation data');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Simple hook for Alerts data
export function useAlerts(): UseApiState<AlertData[]> {
  const [data, setData] = useState<AlertData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    getAlerts()
      .then(response => {
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Failed to load alerts');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
