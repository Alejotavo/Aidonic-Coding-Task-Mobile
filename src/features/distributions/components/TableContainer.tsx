import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFilteredDistributions } from '../hooks/useFilteredDistributions';
import { usePaginatedData } from '../hooks/usePaginatedData';
import { distributions } from '../services/MockApi';
import Filters from './Filters';
import { Pagination } from './Pagination';
import Table from './Table';

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
        onClearFilters={() => {
          setStatus('');
          setRegion('');
        }}
      />
      <Table
        distributions={paginated}
        listFooterComponent={
          <>
            {(!!status || !!region) && (
              <TouchableOpacity
                style={clearBelowStyles.clearBtn}
                onPress={() => {
                  setStatus('');
                  setRegion('');
                }}
              >
                <Text style={clearBelowStyles.clearBtnText}>Clear Search</Text>
              </TouchableOpacity>
            )}
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        }
      />
    </View>
  );
};

export default TableContainer;

const clearBelowStyles = StyleSheet.create({
  clearBtn: {
    backgroundColor: '#2563eb', // azul primario
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 8,
    shadowColor: '#2563eb',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
}); 