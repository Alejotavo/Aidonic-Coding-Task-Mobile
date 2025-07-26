import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage = 6,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    if (currentPage <= 3) {
      end = Math.min(5, totalPages);
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  const pageNumbers = getPageNumbers();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentPage === 1 && styles.disabled]}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text style={styles.arrow}>{'<'}</Text>
      </TouchableOpacity>
      {pageNumbers[0] > 2 && (
        <>
          <TouchableOpacity style={styles.button} onPress={() => onPageChange(1)}>
            <Text style={styles.page}>{1}</Text>
          </TouchableOpacity>
          <Text style={styles.ellipsis}>...</Text>
        </>
      )}
      {pageNumbers.map((page) => (
        <TouchableOpacity
          key={page}
          style={[styles.button, page === currentPage && styles.active]}
          onPress={() => onPageChange(page)}
        >
          <Text style={[styles.page, page === currentPage && styles.activeText]}>{page}</Text>
        </TouchableOpacity>
      ))}
      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
        <>
          <Text style={styles.ellipsis}>...</Text>
          <TouchableOpacity style={styles.button} onPress={() => onPageChange(totalPages)}>
            <Text style={styles.page}>{totalPages}</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={[styles.button, currentPage === totalPages && styles.disabled]}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 2,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#eee',
  },
  page: {
    fontSize: 14,
    color: '#2563eb',
  },
  arrow: {
    fontSize: 16,
    color: '#2563eb',
  },
  ellipsis: {
    fontSize: 16,
    color: '#888',
    marginHorizontal: 2,
  },
}); 