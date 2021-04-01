import React, { useRef, useState } from 'react';
import { Tag, Input, message, Form, Typography, Layout } from 'antd';
import ProForm, { ProFormDigit, ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import _ from 'lodash';
const { Text } = Typography;
function RegisterPage({ dispatch, dvadata }) {
  const dva_register = dvadata.register || {},
    initTags = dva_register.terminals || [],
    initSnrs =
      _.pick(dva_register, ['snr_normal', 'snr_weak', 'snr_alert']) || [];
  console.log('initTags & initSnrs', initTags, initSnrs);
  const [tagipt, setTagipt] = useState(''),
    [tags, setTags] = useState(initTags);
  console.log('now tags is =>', tags);
  return (
    <Layout.Content
      style={{
        padding: 24,
        margin: '0 auto',
      }}
    >
      <ProForm
        name="validate_other"
        initialValues={initSnrs}
        onFinish={async (values) => {
          if (tags.length) values.terminals = tags;
          dispatch({
            type: 'data_register/set_register',
            payload: values,
          });
          console.log(values);
        }}
        onReset={() => {
          setTagipt('');
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 18]}>
          <ProCard headerBordered bordered>
            <Form.Item label="Terminal SN">
              <Input
                name="tags"
                allowClear
                value={tagipt}
                onChange={(e) => setTagipt(e.target.value)}
                addonAfter={
                  <div
                    onClick={() => {
                      setTagipt('');
                      const useript = tagipt.trim();
                      if (!useript) return message.warning('请输入一个值');
                      tags.includes(useript)
                        ? message.warning('标签已存在')
                        : setTags(tags.concat(useript));
                    }}
                  >
                    <PlusOutlined />
                    Add
                  </div>
                }
              />
            </Form.Item>
            {tags.map((tag) => {
              return (
                <Tag
                  key={tag}
                  closable
                  onClose={() => {
                    const newTags = tags.filter((t) => t !== tag);
                    setTags(newTags);
                  }}
                >
                  {tag}
                </Tag>
              );
            })}
          </ProCard>
          <ProCard headerBordered bordered>
            <ProForm.Item
              labelAlign="left"
              wrapperCol={{ span: 16 }}
              labelCol={{ span: 5 }}
              label="SNR Weak"
              extra={
                <Text>
                  平均值低于此数值，将标记为<Text type="secondary"> Weak</Text>
                </Text>
              }
            >
              <ProFormDigit
                name="snr_weak"
                width="sm"
                min={0}
                max={100}
                fieldProps={{ maxLength: 4 }}
              />
            </ProForm.Item>
            <ProForm.Item
              labelAlign="left"
              wrapperCol={{ span: 16 }}
              labelCol={{ span: 5 }}
              extra={
                <Text>
                  平均值低于此数值，将标记为<Text type="warning"> Normal</Text>
                  ；高于此数值将标记为<Text type="success"> Strong</Text>
                </Text>
              }
            >
              <ProFormDigit
                label="SNR Normal"
                name="snr_normal"
                width="sm"
                min={0}
                max={100}
                fieldProps={{ maxLength: 4 }}
              />
            </ProForm.Item>
            <ProForm.Item
              labelAlign="left"
              wrapperCol={{ span: 16 }}
              labelCol={{ span: 5 }}
              extra={
                <Text>
                  比较当前SNR值与上一个数据的SNR值，若差大于此数值，将标记
                  <Text type="danger"> Alert</Text>
                </Text>
              }
            >
              <ProFormDigit
                label="SNR Alert"
                name="snr_alert"
                width="sm"
                min={0}
                max={100}
                fieldProps={{ maxLength: 4 }}
              />
            </ProForm.Item>
          </ProCard>
        </ProCard>
      </ProForm>
    </Layout.Content>
  );
}

export default connect((paraIn) => {
  return { dvadata: paraIn['trace'] };
})(RegisterPage);
