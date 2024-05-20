import React from "react";
import { Button } from "antd";

interface CustomButtonProps {
  onClick?: () => void;
  text: string;
  htmlType: "button" | "submit" | "reset";
  classes?: string;
  type?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  text,
  htmlType = "button",
  classes = "",
  type,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      htmlType={htmlType}
      className={`bg-black hover:bg-[#222831] ant-btn ${classes}`}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
