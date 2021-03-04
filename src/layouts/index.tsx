import React from 'react';
import { Layout, Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
import { Link } from 'umi';
const { Footer } = Layout;
export default (props) => (
  <Layout>
    <Menu mode="horizontal">
      <Menu.Item>
        <div>GNSS信号干扰监测平台</div>
      </Menu.Item>
      <Menu.Item key="register" icon={<MailOutlined />}>
        <Link to="/register">register</Link>
      </Menu.Item>
      <Menu.Item key="trace" icon={<AppstoreOutlined />}>
        <Link to="/trace">trace</Link>
      </Menu.Item>
      <Menu.Item key="logger" icon={<SettingOutlined />}>
        <Link to="/logger">logger</Link>
      </Menu.Item>
      <Menu.Item key="login" icon={<UserOutlined />}>
        <Link to="/userlogin/login">login</Link>
      </Menu.Item>
    </Menu>
    <Layout className="site-layout">
      {props.children}
      <Footer></Footer>
    </Layout>
  </Layout>
);
