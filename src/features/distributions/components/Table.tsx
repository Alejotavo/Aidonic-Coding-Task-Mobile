import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Distribution } from '../models/Distribution';

interface TableProps {
  distributions: Distribution[];
  listFooterComponent?: React.ReactElement | null;
  renderBelowCard?: React.ReactNode; // ya no se usará
}

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  Planned: { bg: '#fef9c3', color: '#a16207', border: '#fde047' },
  Ongoing: { bg: '#dbeafe', color: '#1d4ed8', border: '#60a5fa' },
  Completed: { bg: '#bbf7d0', color: '#166534', border: '#4ade80' },
  Default: { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' },
};

const Table: React.FC<TableProps> = ({ distributions, listFooterComponent }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const renderItem = ({ item }: { item: Distribution }) => {
    const statusStyle = statusColors[item.status] || statusColors.Default;
    return (
      <View style={styles.card}>
        <View style={styles.row}><Text>Region:</Text><Text>{item.region}</Text></View>
        <View style={styles.row}><Text>Date:</Text><Text>{item.date}</Text></View>
        <View style={styles.row}>
          <Text>Status:</Text>
          <Text style={[styles.status, { backgroundColor: statusStyle.bg, color: statusStyle.color, borderColor: statusStyle.border }]}>{item.status}</Text>
        </View>
        <View style={styles.row}><Text>Beneficiaries:</Text><Text>{item.beneficiaries}</Text></View>
        <View style={styles.row}><Text>Aid Type:</Text><Text>{item.aidType}</Text></View>
        <View style={styles.row}><Text>Channel:</Text><Text>{item.deliveryChannel}</Text></View>
        <View style={styles.detailsRow}>
          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => router.push({ pathname: '/distribution-detail', params: { id: item.id } })}
          >
            <Text style={styles.detailsText}>See Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={distributions}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 56 }]}
      ListFooterComponent={listFooterComponent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#2563eb',
    marginRight: 8,
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 12,
    overflow: 'hidden',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  detailsBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2563eb',
    alignItems: 'center',
  },
  detailsText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.2,
  },
});

export default Table; 