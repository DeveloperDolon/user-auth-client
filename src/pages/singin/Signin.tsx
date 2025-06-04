import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/signupbg.jpg";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useLoginMutation } from "../../stores/api/auth";
import { TokenManager } from "../../utils/tokenManager";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Signin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    messageApi.open({
      key,
      type: "loading",
      content: "User finding...",
    });
    try {
      const response = await login(values).unwrap();
      
      if (response) {
        messageApi.open({
          key,
          type: "success",
          content: "Login successful!",
          duration: 2,
        });
        TokenManager.setToken(response?.data?.accessToken);
        navigate("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      messageApi.open({
        key,
        type: "error",
        content: error?.data?.message || "Login failed!",
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
            Sign in
          </h1>
          <Form
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
              ]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              label={null}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          <div>
            <p className="text-center text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-white hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Signin;
