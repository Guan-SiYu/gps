import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
import { Link } from 'umi';
const { Sider, Content, Footer } = Layout;
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
      <SubMenu key="SubMenu" icon={<UserOutlined />} title="登录">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
    <Layout className="site-layout">
      <Content
        className="site-layout-background"
        style={{
          // margin: '24px 16px',
          padding: 24,
          minHeight: '98vh',
          margin: '0 auto',
        }}
      >
        {props.children}
      </Content>
      <Footer></Footer>
    </Layout>
  </Layout>
);
