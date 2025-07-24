import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { distributions } from '../../../shared/services/MockApi';

interface PieChartData {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const Dashboard: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;

  const aidTypeColors = [
    '#4F8EF7', '#F76F8E', '#FFD166', '#06D6A0', '#A259F7', '#FFB347', '#FF6961', '#6EC6FF'
  ];

  function getPieChartData(): PieChartData[] {
    // Agrupa beneficiarios por tipo de ayuda
    const map: Record<string, number> = {};
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
    <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6' }} contentContainerStyle={{ padding: 16 }}>
      <View style={cardStyle}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Beneficiaries by Aid Type</Text>
        <PieChart
          data={getPieChartData()}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(33, 37, 41, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(33, 37, 41, ${opacity})`,
          }}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'0'}
          absolute
        />
      </View>
      <View style={cardStyle}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Beneficiaries Over Time</Text>
        <LineChart
          data={getLineChartData()}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(79, 142, 247, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(33, 37, 41, ${opacity})`,
          }}
          bezier
        />
      </View>
    </ScrollView>
  );
};

export default Dashboard; 