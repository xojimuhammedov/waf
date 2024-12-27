import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps {}

const ApexChart: React.FC<ApexChartProps> = () => {
  const [chartState, setChartState] = useState<any>({
    series: [
      {
        name: 'STOCK ABC',
        data: [15, 24, 36, 48, 72]
      }
    ],
    options: {
      chart: {
        type: 'area',
        height: 150,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        colors: ['#33C280']
      },
      fill: {
        colors: ['#33C280'],
        opacity: 0.1
      },
      grid: {
        borderColor: 'transparent', // Grid chiziqlari rangini yo'q qiladi
        show: false // Gridni umuman ko'rsatmaslik
      },
      labels: ['Department', 'Department', 'Department', 'Department', 'Department'],
      xaxis: {
        labels: {
          show: false // X o'qi yozuvlarini yashiradi (Department)
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false // Y o'qi yozuvlarini yashiradi (raqamlar)
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      }
    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartState.options}
          series={chartState.series}
          type="area"
          height={180}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
