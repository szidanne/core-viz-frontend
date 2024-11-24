import React from "react";
import { Button, ButtonProps, Tooltip } from "antd";

interface Props extends ButtonProps {
  tooltip?: string;
}

const RoundedButton: React.FC<Props> = (props) => {
  return (
    <Tooltip title={props.tooltip}>
      <div>
        <Button {...props} className={`rounded-full ${props.className}`}>
          {props.children}
        </Button>
      </div>
    </Tooltip>
  );
};
export default RoundedButton;
