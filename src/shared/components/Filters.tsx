import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface FiltersProps {
  status: string;
  region: string;
  statusOptions: string[];
  regionOptions: string[];
  onStatusChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onClearFilters?: () => void;
}

function FiltersComponent({
  status,
  region,
  statusOptions,
  regionOptions,
  onStatusChange,
  onRegionChange,
}: FiltersProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        <RNPickerSelect
          onValueChange={onStatusChange}
          items={[{ label: 'See all', value: '' }, ...statusOptions.map(opt => ({ label: opt, value: opt }))]}
          value={status}
          placeholder={{}}
          style={pickerSelectStyles}
        />
      </View>
      <View style={styles.pickerWrapper}>
        <RNPickerSelect
          onValueChange={onRegionChange}
          items={[{ label: 'See all', value: '' }, ...regionOptions.map(opt => ({ label: opt, value: opt }))]}
          value={region}
          placeholder={{}}
          style={pickerSelectStyles}
        />
      </View>
    </View>
  );
}

const Filters = memo(FiltersComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  clearBtnWrapper: {
    marginLeft: 8,
  },
  clearBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 4,
    color: '#374151',
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 4,
    color: '#374151',
    backgroundColor: '#fff',
    marginBottom: 4,
  },
});

export default Filters; 