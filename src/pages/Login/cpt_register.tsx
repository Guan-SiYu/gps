import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'umi';
function page_login(props) {
  return (
    <Form
      name="userlogin"
      className="userLogin"
      initialValues={{ remember: true }}
      onFinish={(values: any) => {
        console.log('Received values of form: ', values);
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
      <div className="form-login-submit-formitem">
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        <Link to="/userlogin/login">login now</Link>
      </div>
    </Form>
  );
}

export default page_login;
