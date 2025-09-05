import { getEmployeesStore } from '../../crud-dashboard/data/employees';
import type { DashboardDataExport } from '../types';

/**
 * Data source manager for connecting dashboard data to Botpress uploads
 */
export class DataSourceManager {
  /**
   * Get employees data
   */
  static async getEmployeesData(): Promise<DashboardDataExport> {
    const employees = getEmployeesStore();
    
    return {
      type: 'employees',
      data: employees.map(emp => ({
        id: emp.id,
        name: emp.name,
        age: emp.age,
        joinDate: emp.joinDate,
        role: emp.role,
        isFullTime: emp.isFullTime,
      })),
      metadata: {
        exportDate: new Date().toISOString(),
        totalRecords: employees.length,
        source: 'employee-management-system',
      },
    };
  }

  /**
   * Get analytics data (mock - replace with your actual API)
   */
  static async getAnalyticsData(): Promise<DashboardDataExport> {
    // This would typically come from your analytics API
    const mockAnalytics = [
      {
        id: 1,
        pageTitle: 'Dashboard Home',
        status: 'Online',
        users: 1234,
        eventCount: 5678,
        viewsPerUser: 4.2,
        averageTime: '2m 34s',
        dailyUsers: [100, 120, 80, 150, 200],
      },
      {
        id: 2,
        pageTitle: 'Employee Management',
        status: 'Online',
        users: 856,
        eventCount: 2341,
        viewsPerUser: 3.1,
        averageTime: '1m 45s',
        dailyUsers: [80, 90, 95, 110, 120],
      },
    ];

    return {
      type: 'analytics',
      data: mockAnalytics,
      metadata: {
        exportDate: new Date().toISOString(),
        totalRecords: mockAnalytics.length,
        source: 'analytics-dashboard',
      },
    };
  }

  /**
   * Get statistics data (mock - replace with your actual API)
   */
  static async getStatsData(): Promise<DashboardDataExport> {
    const mockStats = [
      {
        title: 'Total Users',
        value: '2,341',
        interval: 'Last 30 days',
        trend: 'up' as const,
        data: [100, 120, 150, 180, 200, 220, 250],
      },
      {
        title: 'Revenue',
        value: '$12,345',
        interval: 'Last 30 days',
        trend: 'up' as const,
        data: [1000, 1100, 1050, 1200, 1300, 1250, 1345],
      },
      {
        title: 'Conversion Rate',
        value: '3.2%',
        interval: 'Last 30 days',
        trend: 'down' as const,
        data: [3.5, 3.4, 3.3, 3.2, 3.1, 3.2, 3.2],
      },
    ];

    return {
      type: 'stats',
      data: mockStats,
      metadata: {
        exportDate: new Date().toISOString(),
        totalRecords: mockStats.length,
        source: 'statistics-dashboard',
      },
    };
  }

  /**
   * Get session data (mock - replace with your actual API)
   */
  static async getSessionsData(): Promise<DashboardDataExport> {
    const mockSessions = [
      {
        date: '2024-01-01',
        desktop: 1200,
        mobile: 800,
        tablet: 200,
      },
      {
        date: '2024-01-02',
        desktop: 1150,
        mobile: 850,
        tablet: 180,
      },
      {
        date: '2024-01-03',
        desktop: 1300,
        mobile: 900,
        tablet: 220,
      },
    ];

    return {
      type: 'sessions',
      data: mockSessions,
      metadata: {
        exportDate: new Date().toISOString(),
        totalRecords: mockSessions.length,
        source: 'session-analytics',
      },
    };
  }

  /**
   * Get all available data sources
   */
  static getDataSources() {
    return [
      {
        id: 'employees',
        name: 'Employee Data',
        type: 'employees' as const,
        getData: this.getEmployeesData,
        enabled: true,
        description: 'Company employee information including roles, ages, and employment details',
      },
      {
        id: 'analytics',
        name: 'Page Analytics',
        type: 'analytics' as const,
        getData: this.getAnalyticsData,
        enabled: true,
        description: 'Website page analytics, user engagement, and performance metrics',
      },
      {
        id: 'stats',
        name: 'Key Statistics',
        type: 'stats' as const,
        getData: this.getStatsData,
        enabled: true,
        description: 'Key performance indicators and statistical data',
      },
      {
        id: 'sessions',
        name: 'Session Data',
        type: 'sessions' as const,
        getData: this.getSessionsData,
        enabled: true,
        description: 'User session data across different devices',
      },
    ];
  }

  /**
   * Get data source by ID
   */
  static getDataSource(id: string) {
    return this.getDataSources().find(source => source.id === id);
  }

  /**
   * Get data for multiple sources
   */
  static async getMultipleData(sourceIds: string[]): Promise<{ [key: string]: DashboardDataExport }> {
    const results: { [key: string]: DashboardDataExport } = {};
    
    for (const sourceId of sourceIds) {
      const source = this.getDataSource(sourceId);
      if (source) {
        try {
          results[sourceId] = await source.getData();
        } catch (error) {
          console.error(`Failed to get data for source ${sourceId}:`, error);
        }
      }
    }
    
    return results;
  }
}
