import React from "react";
import { Button, ButtonProps } from "antd";

interface Props extends ButtonProps {}

const RoundedButton: React.FC<Props> = (props) => {
  return (
    <Button {...props} className={`rounded-full ${props.className}`}>
      {props.children}
    </Button>
  );
};
export default RoundedButton;
