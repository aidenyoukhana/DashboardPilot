// API Response types for Dashboard components

export interface StatCardData {
  title: string;
  value: string;
  interval: string;
  trend: 'up' | 'down' | 'neutral';
  data: number[];
}

export interface PageAnalyticsData {
  id: number;
  pageTitle: string;
  status: 'Online' | 'Offline';
  users: number;
  eventCount: number;
  viewsPerUser: number;
  averageTime: string;
  dailyUsers: number[];
}

export interface SessionData {
  date: string;
  desktop: number;
  mobile: number;
  tablet: number;
}

export interface PageViewData {
  month: string;
  views: number;
  downloads: number;
}

export interface CountryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface TreeViewItem {
  id: string;
  label: string;
  children?: TreeViewItem[];
}

export interface NavigationItem {
  label: string;
  icon: string;
  href?: string;
  children?: NavigationItem[];
}

export interface AlertData {
  id: string;
  title: string;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  timestamp: string;
}

// API Response wrappers
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  error: string;
  code: number;
  message: string;
}
