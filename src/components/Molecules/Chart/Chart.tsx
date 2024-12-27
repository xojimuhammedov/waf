import { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import { twMerge } from 'tailwind-merge';
import * as echarts from 'echarts';

interface ChartProps {
  height?: string | number;
  width?: string | number;
  className?: string | string[];
  legends?: Array<{ color?: string; legend: string; className: string }>;
  series: Array<{
    name?: string;
    data: number[];
    type?: ChartProps['type'];
    color?: string;
    itemStyle?: any;
    label?: any;
  }>;
  xAxis: {
    data: string[];
  };
  type: 'line' | 'bar' | 'pictorialBar';
}

const Chart: FC<ChartProps> = ({
  height = '100%',
  width,
  className,
  legends = [],
  series,
  xAxis,
  type
}) => {
  const barData: any = [55, 20, 36];

  const barColors: any = [
    ['rgba(28, 209, 237, 0.27)', 'rgba(32, 32, 32, 0.00)'],
    ['rgba(136, 60, 12, 0.50)', 'rgba(32, 32, 32, 0.00)'],
    ['rgba(67, 104, 19, 0.50)', 'rgba(32, 32, 32, 0.00)']
  ];

  const seriesData = (data: any, colors: any) => {
    return data.map((val: any, idx: any) => ({
      value: val,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: colors[idx][0] },
          { offset: 1, color: colors[idx][1] }
        ])
      }
    }));
  };

  const chartData = seriesData(barData, barColors);

  const options = {
    tooltip: {},
    xAxis: {
      data: ['datagaze.uz', 'waf.datagaze.uz', 'lp.eset.lab'],
      axisLabel: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: 'Series',
        type: 'bar',
        data: chartData
      }
    ]
  };

  return (
    <div className="h-full w-full">
      <ReactEcharts
        option={options}
        style={{ height, width }}
        className={twMerge('w-full', className)}
      />

      <div className="flex items-center justify-center gap-4 pb-8 pl-[10px]">
        <div className="flex items-center gap-2">
          <span style={{ background: '#176936' }} className="h-4 w-4 rounded-full"></span>
          <p className="text-c-s text-white dark:text-dark-text">{'datagaze.uz'}</p>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ background: '#883C0C' }} className="h-4 w-4 rounded-full"></span>
          <p className="text-c-s text-white dark:text-dark-text">{'waf.datagaze.uz'}</p>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ background: '#436813' }} className="h-4 w-4 rounded-full"></span>
          <p className="text-c-s text-white dark:text-dark-text">{'lp.eset.lab'}</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
