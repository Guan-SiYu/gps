import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import config from '../config';
import axios from 'axios';
import { connect } from 'dva';
import jwtDecode from 'jwt-decode';

function RegisterCpt({ dispatch }) {
  return (
    <Form
      name="userlogin"
      className="userLogin"
      initialValues={{ remember: true }}
      onFinish={async (values: any) => {
        values.hasOwnProperty('re_password') && delete values['re_password'];
        try {
          const response = await axios.post(
            config.apiEndpoint + config['userlogin']['register'],
            JSON.stringify(values),
          );
          await localStorage.setItem('token', response.headers['x-auth-token']);
          const curjwt = localStorage.getItem('token'),
            userobj = jwtDecode(curjwt);
          await dispatch({ type: 'user/set_curuser', payload: userobj });
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
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        className="form-login-pwd"
        name="re_password"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              return !value || getFieldValue('password') === value
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <div className="form-login-submit-formitem">
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        <Link to="/userlogin/login">login now</Link>
      </div>
    </Form>
  );
}

export default connect((paraIn) => {
  return { curuser: paraIn['user'] };
})(RegisterCpt);
