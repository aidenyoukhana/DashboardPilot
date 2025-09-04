import type { TreeViewItem, ApiResponse } from './types';
import { mockApiEndpoints } from './mockApi';

// Mock API function - fetches from JSON file
export const getTreeViewData = async (
  expandLevel?: number
): Promise<ApiResponse<TreeViewItem[]>> => {
  try {
    const params = expandLevel !== undefined ? `expandLevel=${expandLevel}` : undefined;
    const response = await mockApiEndpoints.getTreeView(params);
    return response as ApiResponse<TreeViewItem[]>;
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get specific tree branch data
export const getTreeBranchData = async (
  branchId: string
): Promise<ApiResponse<TreeViewItem | null>> => {
  try {
    const params = `branchId=${branchId}`;
    const response = await mockApiEndpoints.getTreeView(params);
    
    // Extract specific branch from response data
    const findBranch = (items: TreeViewItem[], id: string): TreeViewItem | null => {
      for (const item of items) {
        if (item.id === id) {
          return item;
        }
        if (item.children) {
          const found = findBranch(item.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    if (response.success && response.data) {
      const data = response.data as TreeViewItem[];
      const branch = findBranch(data, branchId);
      return {
        data: branch,
        success: true,
        message: branch ? 'Tree branch retrieved successfully' : 'Branch not found'
      };
    }
    
    throw new Error('Failed to get tree view data');
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Add new tree item
export const addTreeItem = async (
  _parentId: string | null,
  newItem: Omit<TreeViewItem, 'id'>
): Promise<ApiResponse<TreeViewItem>> => {
  try {
    const newTreeItem: TreeViewItem = {
      ...newItem,
      id: `item_${Date.now()}` // Generate unique ID
    };
    
    // Simulate adding item by returning success response
    return {
      data: newTreeItem,
      success: true,
      message: 'Tree item added successfully'
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Delete tree item
export const deleteTreeItem = async (
  itemId: string
): Promise<ApiResponse<{ deleted: boolean }>> => {
  try {
    const response = await mockApiEndpoints.delete(`tree-items/${itemId}`);
    return response as ApiResponse<{ deleted: boolean }>;
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
export const getTreeViewData = async (
  expandLevel?: number
): Promise<ApiResponse<TreeViewItem[]>> => {
  try {
    const params = new URLSearchParams();
    if (expandLevel !== undefined) {
      params.append('expandLevel', expandLevel.toString());
    }
    
    const response = await fetch(`/api/dashboard/tree-view?${params}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch tree view data');
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

export const getTreeBranchData = async (
  branchId: string
): Promise<ApiResponse<TreeViewItem | null>> => {
  try {
    const response = await fetch(`/api/dashboard/tree-view/${branchId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch tree branch data');
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
