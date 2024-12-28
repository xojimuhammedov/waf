import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ countData, time, title }: any) => {
  const [chartState, setChartState] = useState<any>({
    series: [
      {
        name: 'Hujumlar',
        data: countData
      }
    ],
    options: {
      chart: {
        type: 'area',
        height: '250px',
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
      labels: time,
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

  useEffect(() => {
    setChartState((prev: any) => ({
      ...prev,
      series: [{ name: title, data: countData }],
      options: { ...prev.options, labels: time }
    }));
  }, [countData, time]);

  return (
    <div className="w-full">
      <div id="chart">
        <ReactApexChart
          options={chartState.options}
          series={chartState.series}
          type="area"
          height={'100%'}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
