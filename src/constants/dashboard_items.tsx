import { Link } from "react-router-dom";
import {
  AuditOutlined,
  PieChartOutlined,
  ProductOutlined,
  TeamOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import type React from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const dashboard_items: MenuItem[] = [
  getItem(<Link to={"/dashboard"}>Dashboard</Link>, "1", <PieChartOutlined />),
  getItem(
    <Link to={"/dashboard/product-management"}>Product Management</Link>,
    "2",
    <ProductOutlined />
  ),
  getItem(
    <Link to={"/dashboard/user-management"}>User Management</Link>,
    "3",
    <UserOutlined />
  ),
  getItem(
    <Link to={"/dashboard/order-management"}>Order Management</Link>,
    "4",
    <AuditOutlined />
  ),
  getItem(
    <Link to={"/dashboard/role-management"}>Role Management</Link>,
    "5",
    <UsergroupDeleteOutlined />
  ),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
];
