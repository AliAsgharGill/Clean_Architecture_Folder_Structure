import axios from "axios";
import { message } from "antd";
import { FormValues } from "../../Interfaces/Interfaces";
import { setUser } from "../../core/useCases/Redux/Slices/userSlice";
import { setAdmin } from "../../core/useCases/Redux/Slices/adminSlice";

export const loginUseCase = async (
  values: FormValues,
  type: string,
  dispatch: any, 
  navigate: any 
) => {
  try {
    const emailResponse = await axios.get(
      `http://localhost:3000/${type}s?email=${values.email}`
    );

    if (!emailResponse.data.length) {
      message.warning(`Invalid Email ${values.email}. Please Signup First`);
      return;
    }

    const userData = emailResponse.data[0];
    if (userData.password !== values.password) {
      message.error("Invalid password. Please try again.");
      return;
    }

    if (type === "admin") {
      message.success("Welcome Back Admin");
      localStorage.setItem("admin", JSON.stringify(userData));
      dispatch(setAdmin(userData));
      navigate("/dashboard");
    } else if (type === "user") {
      message.success("Welcome Back");
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(userData));
      navigate("/");
    }
  } catch (error) {
    console.warn("Error", error);
  }
};
