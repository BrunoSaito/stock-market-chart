import { useEffect, useState } from 'react';
import './App.css';
import { usePriceByPeriod } from './domain';
import { ResponsiveLine } from '@nivo/line'
import dayjs from 'dayjs';

function App() {
  const { getPrices, prices } = usePriceByPeriod();
  const [data, setData] = useState<any[] | undefined>([]);
  const [valuesToShow, setValuesToShow] = useState<any[] | undefined>([]);

  useEffect(() => {
    getPrices({
      symbol: 'AAPL',
      startDate: '2022-01-01',
      endDate: '2022-04-30',
    });
  }, []);

  useEffect(() => {
    setData(prices?.map(price => ({ x: dayjs(price.Date).format('YYYY-MM-DD'), y: price.Close })));
  }, [prices]);

  useEffect(() => {
    setValuesToShow(data?.map((v, i) => {
      if (i % 2 === 0 && i !== 0 && i !== data?.length) {
        return '';
      } else {
        return v;
      }
    }));
  }, [data]);

  return (
    <div className="App">
      <div style={{ width: '100%', height: '500px' }}>
        <ResponsiveLine
          data={[{ id: 'price', data: data ?? [] }] ?? []}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{
            type: 'point',
          }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            format: v =>  valuesToShow?.find(vts => vts?.x === v) ? v : "",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          enableGridX={false}
      />
      </div>
    </div>
  );
}

export default App;
