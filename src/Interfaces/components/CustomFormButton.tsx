import React from "react";
import { Button } from "antd";

interface CustomFormButtonProps {
  label: string;
  type?: "primary" | "default" | "dashed" | "link" | "text";
  htmlType?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const CustomFormButton: React.FC<CustomFormButtonProps> = ({
  label,
  type = "primary",
  htmlType = "button",
  onClick,
}) => {
  return (
    <Button type={type} htmlType={htmlType} onClick={onClick}>
      {label}
    </Button>
  );
};

export default CustomFormButton;
