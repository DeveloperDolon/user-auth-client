import backgroundImage from "../../assets/signupbg.jpg";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Select } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  shopNames?: string[];
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Signup = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `url(${backgroundImage}) no-repeat center right fixed`,
      }}
    >
      <ResponsiveContainer className="flex justify-center items-center h-screen">
        <div className="bg-white md:min-w-[600px] max: mx-auto p-6 rounded-lg bg-opacity-50">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Signup;
