import { Button, ButtonProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ToggleButtonProps extends Omit<ButtonProps, 'onClick'> {
  value?: any;
  isToggled?: boolean;
  onClick?: (value?: any) => void;
}

export const ToggleButton = ({ isToggled: initialToggled, value, onClick, children }: ToggleButtonProps) => {
  const [isToggled, setIsToggled] = useState(initialToggled);

  const handleClick = () => {
    onClick?.(value);
  };

  useEffect(() => {
    setIsToggled(initialToggled);
  }, [initialToggled]);

  return (
    <Button bgColor={isToggled ? 'blue.100' : 'gray.100'} onClick={handleClick}>
      {children}
    </Button>
  );
};