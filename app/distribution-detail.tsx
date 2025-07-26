import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { distributionDetails } from '../src/shared/services/MockApi';

function DistributionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const detail = id ? distributionDetails[id] : null;

  if (!detail) {
    return (
      <View style={styles.container}><Text>Distribution not found.</Text></View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Distribution Detail</Text>
        <View style={styles.row}><Text style={styles.label}>Region:</Text><Text style={styles.value}>{detail.region}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Date:</Text><Text style={styles.value}>{detail.date}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Status:</Text><Text style={styles.value}>{detail.status}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Beneficiaries:</Text><Text style={styles.value}>{detail.beneficiaries}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Aid Type:</Text><Text style={styles.value}>{detail.aidType}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Channel:</Text><Text style={styles.value}>{detail.deliveryChannel}</Text></View>
        <Text style={[styles.label, { marginTop: 16 }]}>Beneficiary List:</Text>
        <View style={styles.pillsContainer}>
          {detail.beneficiaryList.map(b => (
            <View key={b.id} style={styles.pill}>
              <Text style={styles.pillText}>{b.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 1,
    borderColor: '#e5e7eb',
    width: '100%',
    maxWidth: 420,
    marginTop: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
  label: {
    fontWeight: '600',
    color: '#6b7280', // gris oscuro
    fontSize: 15,
    marginRight: 6,
  },
  value: {
    fontWeight: '400',
    color: '#111827', // casi negro
    fontSize: 15,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  pill: {
    backgroundColor: '#e0e7ff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  pillText: {
    color: '#3730a3',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default DistributionDetailScreen; 