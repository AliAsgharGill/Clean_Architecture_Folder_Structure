import { Form} from "antd";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiUserFill } from "react-icons/ri";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { SignupUseCase } from "../../../core/useCases/SignupUseCase";
import CustomFormItem from "../CustomFormItem";

const SignupForm = ({ type }: { type: string }) => {
  const { form, navigate, onFinish } = SignupUseCase(type);

  return (
    <div className="min-h-screen p-5 flex justify-center items-center">
      <Form
        form={form}
        className="bg-primaryColor-900 p-10 rounded mt-20 sm:w-1/2 sm:mt-30 md:w-1/3  md:mt-0"
        name="signup-form"
        onFinish={onFinish}
        layout="vertical"
      >
        <CustomFormItem
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: (
                <span className="font-bold text-text-800 ">
                  Please enter your first name!
                </span>
              ),
            },
            {
              min: 3,
              message: (
                <span className="font-bold text-text-800">
                  Name must be at least 3 characters long!
                </span>
              ),
            },
            {
              max: 9,
              message: (
                <span className="font-bold text-text-800">
                  Keep Less than 9 characters!
                </span>
              ),
            },
          ]}
          placeholder="First Name"
          prefix={<RiUserFill />}
        />

        <CustomFormItem
          label="Second Name"
          name="secondName"
          rules={[
            {
              required: true,
              message: (
                <span className="font-bold text-text-800 ">
                  Please enter your second name!
                </span>
              ),
            },
            {
              min: 3,
              message: (
                <span className="font-bold text-text-800">
                  Name must be at least 3 characters long!
                </span>
              ),
            },
          ]}
          placeholder="Second Name"
          prefix={<RiUserFill />}
        />

        <CustomFormItem
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: (
                <span className="font-bold text-text-800">
                  Please enter your email!
                </span>
              ),
            },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: (
                <span className="font-bold text-text-800">
                  Invalid Email Format, Please Enter Valid Email
                </span>
              ),
            },
          ]}
          placeholder="Email"
          prefix={<MdEmail />}
        />

        <CustomFormItem
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: (
                <span className="font-bold text-text-800">
                  Please enter your password!
                </span>
              ),
            },
            {
              min: 6,
              message: (
                <span className="font-bold text-text-800">
                  Password must be at least 6 characters long!
                </span>
              ),
            },
            {
              max: 12,
              message: (
                <span className="font-bold text-text-800">
                  Password must be less than 12 characters long!
                </span>
              ),
            },
            {
              pattern: /^(?=.*[a-z])/,
              message: (
                <span className="font-bold text-text-800">
                  Must have one lowercase letter
                </span>
              ),
            },
            {
              pattern: /^(?=.*[A-Z])/,
              message: (
                <span className="font-bold text-text-800">
                  Must have one uppercase letter
                </span>
              ),
            },
            {
              pattern: /^(?=.*\d)/,
              message: (
                <span className="font-bold text-text-800">
                  Must have one digit
                </span>
              ),
            },
            {
              pattern: /^(?=.*[@$!%*?&])/,
              message: (
                <span className="font-bold text-text-800">
                  Must have any special character (@$!%*?&)
                </span>
              ),
            },
          ]}
          placeholder="Password"
          prefix={<RiLockPasswordFill />}
        />

        <CustomFormItem
          label="Image Link"
          name="image"
          rules={[
            {
              required: true,
              message: (
                <span className="font-bold text-text-800">
                  Please enter Image Link!
                </span>
              ),
            },
          ]}
          placeholder="https://encrypted-tbn0.gstatic.com"
          prefix={<FaExternalLinkSquareAlt />}
        />

        <Form.Item>
          <CustomButton text="Sign Up" htmlType="submit" />
        </Form.Item>
        <Form.Item>
          <p className="text-alphaColor-900 font-bold text-center">
            Already have an account?_
            <Link
              className="text-white font-bold hover:text-secondaryColor-900 hover:underline "
              to="/login/user"
            >
              Login Now
            </Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupForm;