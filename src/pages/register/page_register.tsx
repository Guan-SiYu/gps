import {
  Tag,
  Space,
  Input,
  message,
  Form,
  InputNumber,
  Row,
  Col,
  Typography,
} from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
const { Text, Link } = Typography;
export default (props) => {
  const [tags, setTags] = useState(['1', '2', '3', '4', '5']);
  return (
    <Space direction="vertical" size="large">
      <ProCard>
        <Form.Item label="Terminal SN">
          <Input.Search
            allowClear
            enterButton={
              <div>
                <PlusOutlined />
                Add
              </div>
            }
            onSearch={(userIpt) =>
              tags.includes(userIpt)
                ? message.warning('标签已存在')
                : setTags(tags.concat(userIpt))
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
      <ProCard>
        <Form.Item
          labelAlign="left"
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 5 }}
          label="SNR Weak:"
          extra={
            <Text>
              平均值低于此数值，将标记为<Text type="secondary"> Weak</Text>
            </Text>
          }
        >
          <InputNumber min={1} max={10} defaultValue={3} />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 5 }}
          label="SNR Normal:"
          extra={
            <Text>
              平均值低于此数值，将标记为<Text type="warning"> Normal</Text>{' '}
              ；高于此数值将标记为<Text type="success"> Strong</Text>
            </Text>
          }
        >
          <InputNumber min={1} max={10} defaultValue={3} />
        </Form.Item>

        <Form.Item
          labelAlign="left"
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 5 }}
          label="SNR Alert:"
          extra={
            <Text>
              比较当前SNR值与上一个数据的SNR值，若差大于此数值，将标记
              <Text type="danger"> Alert</Text>
            </Text>
          }
        >
          <InputNumber min={1} max={10} defaultValue={3} />
        </Form.Item>
      </ProCard>
    </Space>
  );
};
