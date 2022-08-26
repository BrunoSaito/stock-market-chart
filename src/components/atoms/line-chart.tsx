import { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { ResponsiveLine, Serie } from "@nivo/line"
import dayjs from "dayjs";

interface LineChartProps {
  data: Serie[];
}

export const LineChart = ({ data }: LineChartProps) => {
  const [valuesToShow, setValuesToShow] = useState<any[]>([]);

  useEffect(() => {
    setValuesToShow(data?.map((v, i) => {
      if (i === 0 ||
        i === data.length - 1 || 
        i === Math.floor(data?.length / 4) ||
        i === Math.floor((data?.length / 4)) * 2 ||
        i === Math.floor((data?.length / 4) * 3)
      ) {
        return v;
      }
      return '';
    }));
  }, [data]);

  return (
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
        tickRotation: 0,
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle',
        format: v =>  valuesToShow?.find(vts => vts?.x === v) ? v : "",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Price ($)',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      pointSize={5}
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
      tooltip={({ point: { data } }) => (
        <Flex color="white" bgColor="blackAlpha.700" p={4} flexDir="column">
          <Text>
            <Text as="b">Date: </Text>
            {dayjs(data.x.toString()).format('DD MMM')}
          </Text>

          <Text>
            <Text as="b">Price: </Text>
            ${Number(data.y.toString()).toFixed(2)}
          </Text>
        </Flex>
      )}
      enableGridX={false}
    />
  )
}