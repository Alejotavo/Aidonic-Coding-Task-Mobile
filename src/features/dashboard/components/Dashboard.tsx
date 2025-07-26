import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useDashboardCharts } from '../hooks/useDashboardCharts';

function Dashboard() {
  const cardHorizontalPadding = 16;
  const { getPieChartData, getLineChartData, cardStyle } = useDashboardCharts(Dimensions.get('window').width);
  const [chartWidth, setChartWidth] = useState(Dimensions.get('window').width - cardHorizontalPadding * 2);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f3f4f6' }}
      contentContainerStyle={{ padding: cardHorizontalPadding }}
    >
      <View style={[cardStyle, { paddingHorizontal: 0 }]}> 
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8, paddingHorizontal: 12 }}>Beneficiaries by Aid Type</Text>
        <View
          style={{ width: '100%' }}
          onLayout={e => setChartWidth(e.nativeEvent.layout.width)}
        >
          <PieChart
            data={getPieChartData()}
            width={chartWidth}
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
      </View>
      <View style={[cardStyle, { paddingHorizontal: 0 }]}> 
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8, paddingHorizontal: 12 }}>Beneficiaries Over Time</Text>
        <View
          style={{ width: '100%' }}
          onLayout={e => setChartWidth(e.nativeEvent.layout.width)}
        >
          <LineChart
            data={getLineChartData()}
            width={chartWidth}
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
      </View>
    </ScrollView>
  );
};

export default Dashboard; 