// src/components/CustomFormItem.tsx

import React, { useState } from "react";
import { Form, Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

interface CustomFormItemProps {
  label: string;
  name: string;
  rules: Array<any>;
  placeholder: string;
  prefix?: React.ReactNode;
  type?: string;
}

const CustomFormItem: React.FC<CustomFormItemProps> = ({
  label,
  name,
  rules,
  placeholder,
  prefix,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordType = type === "password";

  return (
    <Form.Item label={label} name={name} rules={rules}>
      {isPasswordType ? (
        <Input.Password
          placeholder={placeholder}
          prefix={prefix}
          iconRender={() =>
            showPassword ? (
              <EyeOutlined onClick={togglePasswordVisibility} />
            ) : (
              <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
            )
          }
          type={showPassword ? "text" : "password"}
          autoComplete="off"
        />
      ) : (
        <Input
          placeholder={placeholder}
          prefix={prefix}
          type={type}
          autoComplete="off"
        />
      )}
    </Form.Item>
  );
};

export default CustomFormItem;
