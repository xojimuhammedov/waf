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
      data: ['Category1', 'Category2', 'Category3'],
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

      {/* {legends && (
        <div className="mt-l flex items-center pl-[10px]">
          {legends.map((legend, i) => (
            <div className="flex items-center" key={i}>
              <div
                className={twMerge(
                  'ml-2 mr-2 h-3 w-3 rounded-full',
                  legend.className,
                  i === 0 && 'ml-0'
                )}
              />
              <p className="text-c-s text-text-base dark:text-dark-text">{legend.legend}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Chart;
