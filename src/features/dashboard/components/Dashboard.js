import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';



const Dashboard = () => {


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Aid Distribution Dashboard</Text>
      <Text style={styles.subtitle}>Distribuciones por tipo de ayuda</Text>
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>[Aquí iría el gráfico de torta]</Text>
      </View>
      <Text style={styles.subtitle}>Beneficiarios por distribución</Text>
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>[Aquí iría el gráfico de líneas]</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderBox: {
    width: '90%',
    height: 220,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default Dashboard;