import { useCallback, useMemo } from 'react';
import { distributions } from '../../../shared/services/MockApi';

export function useDashboardCharts(screenWidth: number) {
  const aidTypeColors = useMemo(
    () => [
      '#4F8EF7', '#F76F8E', '#FFD166', '#06D6A0', '#A259F7', '#FFB347', '#FF6961', '#6EC6FF'
    ],
    []
  );

  const getPieChartData = useCallback(() => {
    const map: Record<string, number> = {};
    distributions.forEach(d => {
      if (!map[d.aidType]) map[d.aidType] = 0;
      map[d.aidType] += d.beneficiaries;
    });
    return Object.entries(map).map(([name, population], i) => ({
      name,
      population,
      color: aidTypeColors[i % aidTypeColors.length],
      legendFontColor: '#333',
      legendFontSize: 14,
    }));
  }, [aidTypeColors]);

  const getLineChartData = useCallback(() => ({
    labels: distributions.map((d, i) => {
      if (i % 3 === 0) {
        const [, month, day] = d.date.split('-');
        return `${month}-${day}`;
      }
      return '';
    }),
    datasets: [
      {
        data: distributions.map(d => d.beneficiaries),
        color: (opacity = 1) => `rgba(79, 142, 247, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }), []);

  const cardStyle = useMemo(() => ({
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#e5e7eb',
  }), []);

  return { getPieChartData, getLineChartData, cardStyle };
} 