import { createContext } from 'react';

type Page = 'dashboard' | 'profile';

interface NavigationContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export type { Page, NavigationContextType };
