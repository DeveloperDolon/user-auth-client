import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Avatar, Breadcrumb, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { dashboard_items } from "../constants/dashboard_items";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMeQuery } from "../stores/api/auth";

const { Header, Content, Footer, Sider } = Layout;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { data: user, isFetching } = useMeQuery(1);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const pathArray = location.pathname.split("/");

  const breadcrumbItems = pathArray.map((item: string) => {
    return {
      href: "/" + pathArray.slice(1, pathArray.indexOf(item) + 1).join("/"),
      breadcrumbName: (item.charAt(0).toUpperCase() + item.slice(1))
        .split("-")
        .join(" "),
    };
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  if (!isFetching) {
    if (!user?.success) {
      navigate("/signin");
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical text-white md:text-xl sm:text-lg text-base font-semibold text-center py-4">
          This is the logo
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={dashboard_items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0px 50px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div></div>
          <Dropdown
            menu={{
              items: [
                ...(user?.data?.shopNames ?? []).map((item: string, idx: number) => ({
                  key: idx,
                  label: <Link to={`http://${item}.localhost:5173`}><Button type="text">{item}</Button></Link>,
                })),
                {
                  key: "logout",
                  label: <Button icon={<LogoutOutlined />}>Logout</Button>,
                  onClick: logout,
                },
              ],
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space size={24}>
                <Avatar shape="square" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb items={breadcrumbItems} style={{ margin: "16px 0" }} />

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Dashboard ©{new Date().getFullYear()} Created by DeveloperDolon
        </Footer>
      </Layout>
    </Layout>
  );
}
