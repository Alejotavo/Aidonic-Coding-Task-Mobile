import { useMemo } from 'react';
import type { Distribution } from '../models/Distribution';

export function useFilteredDistributions(
  distributions: Distribution[],
  status: string,
  region: string
): Distribution[] {
  return useMemo(() => {
    let result = distributions;
    if (status) result = result.filter(d => d.status === status);
    if (region) result = result.filter(d => d.region === region);
    return result;
  }, [distributions, status, region]);
} 