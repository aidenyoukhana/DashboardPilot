import type { NavigationItem, ApiResponse } from './types';
import { mockApiEndpoints } from './mockApi';

// Navigation state interface
interface NavigationState {
  expandedItems: string[];
  collapsedSidebar: boolean;
  pinnedItems: string[];
}

// Mock API function - fetches from JSON file
export const getNavigationData = async (): Promise<ApiResponse<NavigationItem[]>> => {
  try {
    const response = await mockApiEndpoints.getNavigation();
    return response as ApiResponse<NavigationItem[]>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get navigation state (expanded/collapsed states)
export const getNavigationState = async (): Promise<ApiResponse<NavigationState>> => {
  try {
    // For now, return a default state, but this could be stored in local storage or backend
    return {
      data: {
        expandedItems: ['dashboard', 'analytics'],
        collapsedSidebar: false,
        pinnedItems: ['dashboard']
      },
      success: true,
      message: 'Navigation state retrieved successfully'
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Update navigation state
export const updateNavigationState = async (
  state: Partial<NavigationState>
): Promise<ApiResponse<NavigationState>> => {
  try {
    // In a real app, this would save to backend or local storage
    const updatedState: NavigationState = {
      expandedItems: state.expandedItems || [],
      collapsedSidebar: state.collapsedSidebar || false,
      pinnedItems: state.pinnedItems || []
    };
    
    return {
      data: updatedState,
      success: true,
      message: 'Navigation state updated successfully'
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get user preferences for navigation
export const getUserNavigationPreferences = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _userId: string
): Promise<ApiResponse<{
  preferredStartPage: string;
  sidebarPosition: 'left' | 'right';
  theme: 'light' | 'dark' | 'auto';
}>> => {
  try {
    // Return mock preferences (normally would use userId to fetch from backend)
    return {
      data: {
        preferredStartPage: '/dashboard',
        sidebarPosition: 'left',
        theme: 'auto'
      },
      success: true,
      message: 'User navigation preferences retrieved successfully'
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Update user navigation preferences
export const updateUserNavigationPreferences = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _userId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _preferences: {
    preferredStartPage?: string;
    sidebarPosition?: 'left' | 'right';
    theme?: 'light' | 'dark' | 'auto';
  }
): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    // In a real app, this would save preferences to backend
    return {
      data: { success: true },
      success: true,
      message: 'User navigation preferences updated successfully'
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get navigation permissions for user
export const getNavigationPermissions = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _userId: string
): Promise<ApiResponse<{
  canAccess: string[];
  restrictions: string[];
}>> => {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  // Mock permissions data
  const permissions = {
    canAccess: [
      '/dashboard',
      '/analytics/*',
      '/users',
      '/content/*',
      '/settings/general',
      '/help/*'
    ],
    restrictions: [
      '/settings/security',
      '/settings/api-keys'
    ]
  };
  
  return {
    data: permissions,
    success: true,
    message: 'Navigation permissions retrieved successfully'
  };
};

// Get breadcrumbs for current path
export const getBreadcrumbs = async (
  currentPath: string
): Promise<ApiResponse<Array<{ label: string; href: string }>>> => {
  try {
    // Simple breadcrumb generation based on path
    const pathSegments = currentPath.split('/').filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: '/' + pathSegments.slice(0, index + 1).join('/')
    }));
    
    // Add home breadcrumb
    breadcrumbs.unshift({ label: 'Home', href: '/' });
    
    return {
      data: breadcrumbs,
      success: true,
      message: 'Breadcrumb data generated successfully'
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get user menu data
export const getUserMenuData = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _userId: string
): Promise<ApiResponse<{
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  menuItems: Array<{
    label: string;
    icon: string;
    href?: string;
    action?: string;
  }>;
}>> => {
  try {
    // Mock user data
    const userData = {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: '/avatars/john-doe.jpg',
        role: 'Administrator'
      },
      menuItems: [
        { label: 'Profile', icon: 'profile', href: '/profile' },
        { label: 'Account Settings', icon: 'settings', href: '/account' },
        { label: 'Notifications', icon: 'notifications', href: '/notifications' },
        { label: 'Help & Support', icon: 'help', href: '/help' },
        { label: 'Sign Out', icon: 'logout', action: 'logout' }
      ]
    };
    
    return {
      data: userData,
      success: true,
      message: 'User menu data retrieved successfully'
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
