import { useMemo } from 'react';

export function usePaginatedData<T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
): T[] {
  return useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return data.slice(startIdx, startIdx + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);
} 