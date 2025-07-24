import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { distributions } from '../../distributions/services/MockApi';


const Dashboard = () => {
  const screenWidth = Dimensions.get('window').width;

  const aidTypeColors = [
    '#4F8EF7', '#F76F8E', '#FFD166', '#06D6A0', '#A259F7', '#FFB347', '#FF6961', '#6EC6FF'
  ];

  function getPieChartData() {
    // Agrupa beneficiarios por tipo de ayuda
    const map = {};
    distributions.forEach(d => {
      if (!map[d.aidType]) map[d.aidType] = 0;
      map[d.aidType] += d.beneficiaries;
    });
    return Object.entries(map).map(([name, population], i) => ({
      name,
      population,
      color: aidTypeColors[i % aidTypeColors.length],
      legendFontColor: '#333',
      legendFontSize: 14,
    }));
  }

  function getLineChartData() {
    return {
      labels: distributions.map((d, i) => {
        if (i % 3 === 0) {
          const [, month, day] = d.date.split('-');
          return `${month}-${day}`;
        }
        return '';
      }),
      datasets: [
        {
          data: distributions.map(d => d.beneficiaries),
          color: (opacity = 1) => `rgba(79, 142, 247, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  }

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#e5e7eb',
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: '#f3f4f6' }}>
      <View style={cardStyle}>
        <Text style={styles.subtitle}>Aid Distribution by Type</Text>
        <PieChart
          data={getPieChartData()}
          width={screenWidth * 0.9 - 32}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'10'}
          absolute
          style={{ borderRadius: 12 }}
        />
      </View>
      <View style={cardStyle}>
        <Text style={styles.subtitle}>Beneficiaries per Distribution</Text>
        <LineChart
          data={getLineChartData()}
          width={screenWidth * 0.9 - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 12 },
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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