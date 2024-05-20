import { Form } from "antd";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { loginUseCase } from "../../../core/useCases/auth/LoginUseCase";
import { FormValues } from "../../../Interfaces/Interfaces";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomFormItem from "../common/CustomFormItem";
import CustomButton from "../common/CustomButton";

const Login = ({ type }: { type: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    await loginUseCase(values, type, dispatch, navigate);
  };
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <Form
          name="login-form"
          onFinish={onFinish}
          layout="vertical"
          className="bg-primaryColor-900 p-10 rounded mt-20 sm:mt-20 md:mt-0 sm:w-1/3"
        >
          <CustomFormItem
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: (
                  <span className="error-message">
                    Please enter your email!
                  </span>
                ),
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: (
                  <span className="error-message font-bold">
                    Please Enter Valid Email
                  </span>
                ),
              },
            ]}
            placeholder="Email"
            prefix={<FaRegUserCircle />}
          />

          <CustomFormItem
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: (
                  <span className="error-message">
                    Please enter your password!
                  </span>
                ),
              },
            ]}
            placeholder="Password"
            prefix={<RiLockPasswordLine />}
            type="password"
          />
          <CustomButton
            text="Submit"
            htmlType="submit"
            classes="my-custom-class"
          />
          <Form.Item>
            <p className="text-alphaColor-900 font-bold text-center">
              Don't have an account-
              <Link
                className="text-white hover:text-secondaryColor-900 font-bold  hover:underline "
                to="/signup/user"
              >
                Signup Now
              </Link>
            </p>

            <Link
              className="text-blue-500 hover:text-[#F09A3E] text-center"
              to="/login/admin"
            >
              {type === "user" ? (
                <>
                  <p className="text-black hover:text-black font-bold">OR</p>
                  <p className="text-white font-bold hover:alphaColor-900 hover:underline ">
                    Login as Admin
                  </p>
                </>
              ) : (
                ""
              )}
            </Link>
            <Link
              className="text-blue-500 hover:text-[#F09A3E] text-center"
              to="/login/user"
            >
              {type === "admin" ? (
                <>
                  <p className="text-black hover:text-black font-bold">OR</p>
                  <p className="text-white font-bold hover:alphaColor-900 hover:underline ">
                    Login as User
                  </p>
                </>
              ) : (
                ""
              )}
            </Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
