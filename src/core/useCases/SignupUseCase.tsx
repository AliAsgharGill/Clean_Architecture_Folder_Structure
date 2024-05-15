import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, message } from "antd";
import axios from "axios";
import { setUser } from "../../core/useCases/Redux/Slices/userSlice";
import { setAdmin } from "../../core/useCases/Redux/Slices/adminSlice";

interface FormValues {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  image: string;
}

  
export const SignupUseCase = (type: string) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const adminString = localStorage.getItem("admin");
  const admin = adminString ? JSON.parse(adminString) : null;

  React.useEffect(() => {
    if (admin || user) {
      message.warning("Please Logout First To Get Register! ");
      navigate("/");
    }
  }, [admin, navigate, user]);

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const checkTokenStatus = async () => {
    const tokenKey = `token_${token}`;
    const tokenUsed = localStorage.getItem(tokenKey);

    if (tokenUsed) {
      message.warning("Link Expired. Redirecting to home page...");
      navigate("/");
      return;
    } else {
      localStorage.setItem(tokenKey, "true");
    }
  };

  window.onload = checkTokenStatus;

  const onFinish = async (values: FormValues) => {
    console.log("Received Values:", values);
    try {
        const validateToken = async (token:string) => {
          const { data: tokens } = await axios.get(
            "http://localhost:3000/tokens"
          );
  
          const now: number = Date.now();
          const findIndex: number = tokens.findIndex(
            (t: { newToken: string; expirationTime: string }) =>
              t.newToken === token && new Date(t.expirationTime).getTime() > now
          );
  
          // console.log("Token Index Data:", findIndex);
  
          // Checking if this link is already used then redirect user to home
          if (findIndex != -1) {
            const tokenKey = `token_${token}`;
            // console.log("Token Key:", tokenKey);
            const tokenUsed = localStorage.getItem(tokenKey);
  
            if (!tokenUsed) {
              message.info("Link Expired");
              navigate("/");
              return;
            } else {
              localStorage.setItem(tokenKey, "true");
            }
  
            return true;
          }
          // message.warning('Invalide Crdentials!')
          return false;
        };
        const result = await validateToken(token);
        // console.log("Result", result);
  
        if (result) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(values.email)) {
            message.error("Invalid email format. Please enter a valid email.");
            return;
          }
  
          if (values.password.length < 6) {
            message.error("Password must be at least 6 characters long.");
            return;
          }
  
          const response = await axios.get(
            `http://localhost:3000/${type}s?email=${values.email}`
          );
          if (response.data.length > 0) {
            message.warning(
              `Email ${values.email} Already Exists. Please Login Instead.`
            );
            return;
          }
  
          await axios.post(`http://localhost:3000/${type}s`, values);
          message.success("Welcome! Registered successfully. Please login.");
  
          if (type === "user") {
            dispatch(setUser(response.data));
            navigate("/login/user");
          } else if (type === "admin") {
            dispatch(setAdmin(response.data));
            navigate("/login/admin");
          }
        } else {
          // Check if user is allowed to signup
          const userAllowed = await axios.get(
            `http://localhost:3000/allowedUsers?email=${values.email}`
          );
          if (!userAllowed.data.length) {
            message.warning("Not allowed to register");
            return;
          }
  
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(values.email)) {
            message.error("Invalid email format. Please enter a valid email.");
            return;
          }
  
          if (values.password.length < 6) {
            message.error("Password must be at least 6 characters long.");
            return;
          }
  
          const response = await axios.get(
            `http://localhost:3000/${type}s?email=${values.email}`
          );
          if (response.data.length > 0) {
            message.warning(
              `Email ${values.email} Already Exists. Please Login Instead.`
            );
            return;
          }
  
          await axios.post(`http://localhost:3000/${type}s`, values);
          message.success("Welcome! Registered successfully. Please login.");
  
          if (type === "user") {
            dispatch(setUser(response.data));
            navigate("/login/user");
          } else if (type === "admin") {
            dispatch(setAdmin(response.data));
            navigate("/login/admin");
          }
        }
      } catch (error) {
        message.error("Error Signing Up:", error);
      }
  };

  return { form, navigate, onFinish };
};
