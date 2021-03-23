import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { connect } from 'dva';
import http from '../../services/http';
import jwtDecode from 'jwt-decode';
import config from '../config';
function LogInCpt({ dispatch }) {
  return (
    <Form
      name="userlogin"
      className="userLogin"
      initialValues={{ remember: true }}
      onFinish={async (values) => {
        try {
          const { data: jwt } = await http.post(
            config.apiEndpoint + config['userlogin']['login'],
            JSON.stringify(values),
          );
          await localStorage.setItem('token', jwt);
          const curjwt = localStorage.getItem('token'),
            curuser = jwtDecode(curjwt);
          await dispatch({ type: 'user/set_curuser', payload: curuser });
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            console.log(ex.response);
            alert(ex.response.data);
          }
        }
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please input your email!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="email"
        />
      </Form.Item>
      <Form.Item
        className="form-login-pwd"
        name="password"
        extra={<Link to="/userlogin/findpwd">Forgot Password ?</Link>}
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <div className="form-login-submit-formitem">
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <Link to="/userlogin/register">register now</Link>
      </div>
    </Form>
  );
}

export default connect((paraIn) => {
  return { curuser: paraIn['user'] };
})(LogInCpt);
