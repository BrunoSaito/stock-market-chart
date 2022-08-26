import { useState } from "react";
import { Price } from "../data";

export interface PriceByPeriodParams {
  symbol?: string;
  period?: string;
}

export const usePriceByPeriod = () => {
  const [prices, setPrices] = useState<Price[] | null>(null);
  const [loading, setLoading] = useState(false);

  const getPrices = async ({
    symbol,
    period,
  }: PriceByPeriodParams) => {
    setLoading(true);
    if (!symbol) {
      setLoading(false);
      return;
    }

    const encodedParams = new URLSearchParams();
    encodedParams.append("symbol", symbol);
    encodedParams.append("period", period ?? '1w');

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
      const response = await (await fetch('https://yahoo-finance97.p.rapidapi.com/price', options)).json();
      setPrices(response.data);
    } catch {
      setPrices(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    getPrices,
    prices,
    loading,
  };
};