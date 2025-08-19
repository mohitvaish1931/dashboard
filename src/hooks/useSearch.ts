import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  icon: React.ComponentType<any>;
}

export function useSearch(searchData: SearchResult[]) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recentSearches', []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase();
    return searchData.filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
    );
  }, [query, searchData]);

  const addToRecentSearches = (searchTerm: string) => {
    if (searchTerm.trim() && !recentSearches.includes(searchTerm)) {
      setRecentSearches(prev => [searchTerm, ...prev.slice(0, 3)]);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return {
    query,
    setQuery,
    results,
    recentSearches,
    addToRecentSearches,
    clearRecentSearches
  };
}