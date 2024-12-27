import { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import { twMerge } from 'tailwind-merge';

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
  height = '80%',
  width,
  className,
  legends = [],
  series,
  xAxis,
  type
}) => {
  const options = {
    title: {
      text: "",
      left: 'center',
      textStyle: {
        color: '#ffffff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: true,
      bottom: '0%',
      textStyle: {
        color: '#ffffff'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['datagaze.uz', 'waf.datagaze.uz', 'lp.eset.lab'],
      axisLabel: {
        color: '#ffffff'
      },
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
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
        type: 'pictorialBar',
        data: [
          {
            value: 30,
            symbol: 'rect',
            symbolSize: [80, 3], // Ustunning yuqori qismini aniqlash (eni, balandligi)
            symbolOffset: [0, -70], // Ustunning yuqorisiga joylash
            itemStyle: {
              color: '#0057FF' // Yuqori qismini ranglash
            }
          },
          {
            value: 20,
            symbol: 'rect',
            symbolSize: [80, 3],
            symbolOffset: [0, -50],
            itemStyle: {
              color: '#FF5733'
            }
          },
          {
            value: 25,
            symbol: 'rect',
            symbolSize: [80, 3],
            symbolOffset: [0, -60],
            itemStyle: {
              color: '#00FF00'
            }
          }
        ],
        z: 10 // Yuqori qatlamda joylashadi
      },
      {
        type: 'bar',
        data: [30, 20, 25], // Umumiy balandliklar
        barWidth: '100%',
        itemStyle: {
          color: '#131313', // Asosiy ustun rangi (gradient yoki oddiy rang)
          opacity: 0.6
        }
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
