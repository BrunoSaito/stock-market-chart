import { useState } from "react";
import { Price } from "../data";

export interface PriceByPeriodParams {
  symbol: string;
  startDate: string;
  endDate: string;
}

export const usePriceByPeriod = () => {
  const [prices, setPrices] = useState<Price[] | null>(null);

  const getPrices = async ({
    symbol,
    startDate,
    endDate,
  }: PriceByPeriodParams) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("end", endDate);
    encodedParams.append("symbol", symbol);
    encodedParams.append("start", startDate);

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'ce0adcc6edmsh8f6fb6b9f6d0fe6p161b4ejsnbf4b9e657bf5',
        'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
      },
      body: encodedParams
    };

    try {
      const response = await (await fetch('https://yahoo-finance97.p.rapidapi.com/price-customdate', options)).json();
      setPrices(response.data);
    } catch {}
  };

  return {
    getPrices,
    prices,
  };
};