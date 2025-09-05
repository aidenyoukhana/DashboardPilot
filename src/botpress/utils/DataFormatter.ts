import type { Employee } from '../../crud-dashboard/data/employees';
import type { PageAnalyticsData, StatCardData, SessionData } from '../../dashboard/api/types';
import type { DashboardDataExport, BotpressTableRow } from '../types';

/**
 * Data formatters for Botpress table rows
 */
export class DataFormatter {
  /**
   * Convert dashboard data to Botpress table rows
   */
  static formatAsTableRows(data: DashboardDataExport): BotpressTableRow[] {
    const { type, data: records } = data;
    
    switch (type) {
      case 'employees':
        return this.formatEmployeesAsTableRows(records as unknown as Employee[]);
      case 'analytics':
        return this.formatAnalyticsAsTableRows(records as unknown as PageAnalyticsData[]);
      case 'stats':
        return this.formatStatsAsTableRows(records as unknown as StatCardData[]);
      case 'sessions':
        return this.formatSessionsAsTableRows(records as unknown as SessionData[]);
      default:
        return this.formatGenericAsTableRows(records);
    }
  }

  /**
   * Format employees as table rows
   */
  private static formatEmployeesAsTableRows(employees: Employee[]): BotpressTableRow[] {
    return employees.map(employee => ({
      employee_id: employee.id,
      name: employee.name,
      age: employee.age,
      join_date: employee.joinDate,
      role: employee.role,
      is_full_time: employee.isFullTime,
      data_type: 'employee',
      created_at: new Date().toISOString()
    }));
  }

  /**
   * Format analytics as table rows
   */
  private static formatAnalyticsAsTableRows(analytics: PageAnalyticsData[]): BotpressTableRow[] {
    return analytics.map((item) => ({
      analytics_id: item.id,
      page_title: item.pageTitle,
      status: item.status,
      users: item.users,
      event_count: item.eventCount,
      views_per_user: item.viewsPerUser,
      average_time: item.averageTime,
      daily_users: item.dailyUsers.join(','),
      data_type: 'analytics',
      created_at: new Date().toISOString()
    }));
  }

  /**
   * Format stats as table rows
   */
  private static formatStatsAsTableRows(stats: StatCardData[]): BotpressTableRow[] {
    return stats.map((stat, index) => ({
      stat_id: index + 1, // Changed to number instead of string
      title: stat.title,
      value: stat.value,
      interval: stat.interval,
      trend: stat.trend,
      data_points: stat.data.join(','),
      data_type: 'stat',
      created_at: new Date().toISOString()
    }));
  }

  /**
   * Format sessions as table rows
   */
  private static formatSessionsAsTableRows(sessions: SessionData[]): BotpressTableRow[] {
    return sessions.map((session, index) => ({
      session_id: index + 1, // Changed to number instead of string
      date: session.date,
      desktop: session.desktop,
      mobile: session.mobile,
      tablet: session.tablet,
      total_sessions: session.desktop + session.mobile + session.tablet,
      data_type: 'session',
      created_at: new Date().toISOString()
    }));
  }

  /**
   * Format generic data as table rows
   */
  private static formatGenericAsTableRows(records: Record<string, unknown>[]): BotpressTableRow[] {
    return records.map((record, index) => ({
      id: `generic_${index}`,
      ...record,
      data_type: 'generic',
      created_at: new Date().toISOString()
    }));
  }
}
