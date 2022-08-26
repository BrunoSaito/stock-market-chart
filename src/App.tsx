import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './App.css';
import { usePriceByPeriod } from './domain';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, ChakraProvider, Flex, FormControl, FormLabel, Heading, HStack, Input, Spinner } from '@chakra-ui/react';
import { LineChart } from './components';
import { TimePeriod, TimePeriodFilter } from './components/molecules';

const initialParams = {
  companyName: undefined,
  symbol: 'AAPL',
  period: TimePeriod.OneWeek,
};

interface Params {
  companyName?: string;
  symbol?: string;
  period?: TimePeriod;
}

function App() {
  const { getPrices, prices, loading } = usePriceByPeriod();
  const [data, setData] = useState<any[] | undefined>([]);

  const [symbol, setSymbol] = useState<string | undefined>(initialParams.symbol);
  const [companyName, setCompanyName] = useState<string | undefined>(initialParams.companyName);
  const [params, setParams] = useState<Params | undefined>(undefined);

  useEffect(() => {
    if (params) {
      getPrices({
        ...params,
      });
    }
  }, [params]);

  useEffect(() => {
    setParams({ ...initialParams })
  }, []);

  useEffect(() => {
    setData(prices?.map(price => ({ x: dayjs(price.Date).format('YYYY-MM-DD'), y: price.Close })));
  }, [prices]);

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(e.target.value);
  };

  const handleCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setParams({
      ...params,
      companyName,
      symbol,
    });
    e.preventDefault();
  };

  const handleTimePeriodChange = (period: TimePeriod) => {
    setParams({
      ...params,
      period,
    });
  };

  return (
    <ChakraProvider>
      <Box p={4} h="100vh">
        <form onSubmit={handleSearch}>
          <Box p={2}>
            <HStack spacing={10}>
              <FormControl>
                <FormLabel>Search by company name</FormLabel>
                <Input value={companyName} onChange={handleCompanyName} />
              </FormControl>

              <FormControl>
                <FormLabel>Search by ticket symbol</FormLabel>
                <Input value={symbol} onChange={handleTicketChange} />
              </FormControl>
            </HStack>

            <Button disabled={loading} colorScheme='blue' mt={4} type='submit'>Search</Button>
          </Box>
        </form>
        {data && data.length > 0 &&
          <Flex flexDir="column">
            <Box w="100%" h="50vh">
              {loading ?
                <Flex height="100%" justifyContent="center" alignItems="center">
                  <Spinner />
                </Flex>
              :
                <Flex height="100%" flexDir="column">
                  <Heading>{params?.companyName ?? params?.symbol}</Heading>
                  <LineChart data={data ?? []} />
                </Flex>
              }
            </Box>
            <TimePeriodFilter initialPeriod={params?.period} onChange={handleTimePeriodChange} />
          </Flex>
        }
        {!loading && (!data || !data?.length) &&
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>No data found!</AlertTitle>
            <AlertDescription>Please, try another search.</AlertDescription>
          </Alert>
        }
      </Box>
    </ChakraProvider>
  );
}

export default App;
