import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useDashboardCharts } from '../hooks/useDashboardCharts';

const Dashboard: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;
  const { getPieChartData, getLineChartData, cardStyle } = useDashboardCharts(screenWidth);

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