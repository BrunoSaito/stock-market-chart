import { ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ToggleButton } from "../atoms/toggle-button";

export enum TimePeriod {
  OneWeek = '1w',
  OneMonth = '1mo',
  ThreeMonths = '3mo',
  SixMonths = '6mo',
  OneYear = '1y',
}

interface TimePeriodFilterProps {
  initialPeriod?: TimePeriod;
  onChange?: (period: TimePeriod) => void;
}

export const TimePeriodFilter = ({ initialPeriod, onChange }: TimePeriodFilterProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(initialPeriod ?? TimePeriod.OneWeek);

  useEffect(() => {
    if (initialPeriod) {
      setSelectedPeriod(initialPeriod);
    }
  }, [initialPeriod]);

  const handleClick = (value: TimePeriod) => {
    setSelectedPeriod(value);
    onChange?.(value);
  };

  return (
    <ButtonGroup gap={4}>
      <ToggleButton
        isToggled={selectedPeriod === TimePeriod.OneWeek}
        value={TimePeriod.OneWeek}
        onClick={handleClick}
      >
        {TimePeriod.OneWeek}
      </ToggleButton>
      <ToggleButton
        isToggled={selectedPeriod === TimePeriod.OneMonth}
        value={TimePeriod.OneMonth} 
        onClick={handleClick}
      >
        {TimePeriod.OneMonth}
      </ToggleButton>
      <ToggleButton
        isToggled={selectedPeriod === TimePeriod.ThreeMonths}
        value={TimePeriod.ThreeMonths}
        onClick={handleClick}
      >
        {TimePeriod.ThreeMonths}
      </ToggleButton>
      <ToggleButton
        isToggled={selectedPeriod === TimePeriod.SixMonths}
        value={TimePeriod.SixMonths}
        onClick={handleClick}
      >
        {TimePeriod.SixMonths}
      </ToggleButton>
      <ToggleButton
        isToggled={selectedPeriod === TimePeriod.OneYear}
        value={TimePeriod.OneYear}
        onClick={handleClick}
      >
        {TimePeriod.OneYear}
      </ToggleButton>
    </ButtonGroup>
  );
};