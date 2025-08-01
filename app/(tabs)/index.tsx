import { SafeAreaView, StyleSheet } from 'react-native';
import TableContainer from '../../src/features/distributions/components/TableContainer';

function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TableContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});

export default MainScreen; 