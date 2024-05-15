// src/components/CustomButton.tsx

import React from "react";
import { Button } from "antd";

interface CustomButtonProps {
  onClick?: () => void;
  text: string;
  htmlType: "button" | "submit" | "reset";
  classes?: string; 
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, text, htmlType = "button", classes = "" }) => {
  return (
    <Button
      type="primary"
      onClick={onClick}
      htmlType={htmlType}
      className={`bg-black hover:bg-[#222831] w-full ant-btn ${classes}`}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
