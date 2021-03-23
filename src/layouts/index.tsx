import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'umi';
import { connect } from 'dva';
const { Footer } = Layout;

const LayoutPage = ({ children, dispatch, curuser }) => {
  return (
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
        {curuser && (
          <React.Fragment>
            <Menu.Item>
              <div>{curuser._id}</div>
            </Menu.Item>
            <Menu.Item key="logout">
              <div
                onClick={async () => {
                  await localStorage.removeItem('token');
                  await dispatch({ type: 'user/set_curuser', payload: null });
                }}
              >
                退出
              </div>
            </Menu.Item>
          </React.Fragment>
        )}
        {!curuser && (
          <Menu.Item key="login" icon={<UserOutlined />}>
            <Link to="/userlogin/login">登录</Link>
          </Menu.Item>
        )}
      </Menu>
      <Layout className="site-layout">
        {children}
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default connect((paraIn) => {
  return { curuser: paraIn['user']['curuser'] };
})(LayoutPage);
