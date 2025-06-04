import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/signupbg.jpg";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import type { FormProps } from "antd";
import { Button, Form, Input, message, Select } from "antd";
import { useSignupMutation } from "../../stores/api/auth";

type FieldType = {
  username?: string;
  password?: string;
  shopNames?: string[];
};

const Signup = () => {
  const [form] = Form.useForm();
  const [signup] = useSignupMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    messageApi.open({
      key,
      type: "loading",
      content: "User registering...",
    });
    try {
      const response = await signup(values).unwrap();

      if (response) {
        messageApi.open({
          key,
          type: "success",
          content: "Signup successful!",
          duration: 2,
        });
        form.resetFields();
        navigate("/signin");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      messageApi.open({
        key,
        type: "error",
        content: error?.data?.message || "Signup failed!",
        duration: 2,
      });
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `url(${backgroundImage}) no-repeat center right fixed`,
      }}
    >
      {contextHolder}
      <ResponsiveContainer className="flex justify-center items-center h-screen">
        <div className="bg-white md:min-w-[600px] max: mx-auto p-6 rounded-lg bg-opacity-50">
          <h1 className="text-center md:text-3xl text-2xl font-semibold mb-5">
            Sign up
          </h1>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  pattern:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Password must be at least 8 characters, include a number and a special character!",
                },
              ]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Shop Names"
              name="shopNames"
              rules={[
                { required: true, message: "Please input shop names!" },
                {
                  validator: (_, value) =>
                    Array.isArray(value) && value.length >= 3
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Please enter at least 3 shop names!")
                        ),
                },
              ]}
            >
              <Select
                mode="tags"
                placeholder="Enter shop names and hit enter"
                style={{ width: "100%" }}
                showSearch={false}
                dropdownStyle={{ display: "none" }}
                tokenSeparators={[","]}
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          <div>
            <p className="text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <Link className="text-white" to="/signin">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Signup;
