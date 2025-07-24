import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { VictoryPie, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native';
import { distributions } from '@/src/shared/services/MockApi';

const chartColors = [
  '#2563eb', '#f59e42', '#10b981', '#f43f5e', '#a78bfa', '#fbbf24',
  '#1e40af', '#ea580c', '#047857', '#be123c', '#7c3aed', '#b45309',
];

function getPieData() {
  const aidTypeCounts = distributions.reduce((acc, curr) => {
    acc[curr.aidType] = (acc[curr.aidType] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(aidTypeCounts).map(([aidType, count], i) => ({
    x: aidType,
    y: count,
    label: `${aidType} (${count})`,
    color: chartColors[i % chartColors.length],
  }));
}

function getLineData() {
  // Ordenar por fecha ascendente
  const sorted = [...distributions].sort((a, b) => a.date.localeCompare(b.date));
  return sorted.map((d, i) => ({ x: d.date.slice(5), y: d.beneficiaries }));
}

const Dashboard = () => {
  const pieData = getPieData();
  const lineData = getLineData();
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Aid Distribution Dashboard</Text>
      <Text style={styles.subtitle}>Distribuciones por tipo de ayuda</Text>
      <VictoryPie
        data={pieData}
        colorScale={pieData.map(d => d.color)}
        width={screenWidth * 0.9}
        height={220}
        labelRadius={({ innerRadius }) => innerRadius + 40}
        style={{
          labels: { fontSize: 13, fill: '#333' },
        }}
      />
      <Text style={styles.subtitle}>Beneficiarios por distribución</Text>
      <VictoryChart
        theme={VictoryTheme.material}
        width={screenWidth * 0.95}
        height={260}
        domainPadding={{ x: 30, y: 20 }}
      >
        <VictoryAxis
          tickFormat={(t) => t}
          style={{ tickLabels: { fontSize: 11, angle: 40, padding: 10 } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => y}
          style={{ tickLabels: { fontSize: 11 } }}
        />
        <VictoryLine
          data={lineData}
          style={{
            data: { stroke: '#2563eb', strokeWidth: 3 },
          }}
        />
      </VictoryChart>
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
});

export default Dashboard;