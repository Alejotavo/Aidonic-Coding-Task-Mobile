import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface FiltersProps {
  status: string;
  region: string;
  statusOptions: string[];
  regionOptions: string[];
  onStatusChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  status,
  region,
  statusOptions,
  regionOptions,
  onStatusChange,
  onRegionChange,
}) => (
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
    marginTop: 16, // 1rem aprox
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 4,
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
    color: '#374151', // gris oscuro
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
    color: '#374151', // gris oscuro
    backgroundColor: '#fff',
    marginBottom: 4,
  },
});

export default Filters; 