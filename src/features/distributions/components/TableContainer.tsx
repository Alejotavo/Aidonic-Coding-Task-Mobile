import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import { distributions } from '../services/MockApi';
import Table from './Table';
import Filters from './Filters';
import { Pagination } from './Pagination';
import { useFilteredDistributions } from '../hooks/useFilteredDistributions';
import { usePaginatedData } from '../hooks/usePaginatedData';

const getUnique = (arr: string[]) => Array.from(new Set(arr));

const TableContainer: React.FC = () => {
  const [status, setStatus] = useState('');
  const [region, setRegion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const statusOptions = useMemo(() => getUnique(distributions.map(d => d.status)), []);
  const regionOptions = useMemo(() => getUnique(distributions.map(d => d.region)), []);

  const filtered = useFilteredDistributions(distributions, status, region);
  const totalItems = filtered.length;
  const paginated = usePaginatedData(filtered, currentPage, itemsPerPage);

  // Reset page if filters change
  React.useEffect(() => { setCurrentPage(1); }, [status, region]);

  return (
    <View>
      <Filters
        status={status}
        region={region}
        statusOptions={statusOptions}
        regionOptions={regionOptions}
        onStatusChange={setStatus}
        onRegionChange={setRegion}
      />
      <Table distributions={paginated} />
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </View>
  );
};

export default TableContainer; 