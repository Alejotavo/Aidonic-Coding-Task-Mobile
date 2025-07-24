import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../src/features/distributions/components/Header';
import TableContainer from '../../src/features/distributions/components/TableContainer';

const MainScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Aid Distributions" />
      <TableContainer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});

export default MainScreen; 