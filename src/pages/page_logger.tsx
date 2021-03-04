import React, { useRef, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { QueryFilter } from '@ant-design/pro-form';
import { Button, Space, Menu, Dropdown, Layout } from 'antd';
import { Form, Select, message, Card, DatePicker } from 'antd';
import ProTable from '@ant-design/pro-table';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import config from './config.json';
import { staticColumns, outputExcel } from './util';
import { Modal } from 'antd';
import { connect } from 'dva';
const { confirm } = Modal;
const { Option } = Select;
const defaultUserIpt = {
  terminal_sn: '',
  date_range: [],
  search: '',
  pick: '',
};
axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});
function LoggerPage(para) {
  const { dispatch, match } = para;
  const [query_express_id, set_query_express_id] = useState(
    match.params.express_id || '',
  );
  const [userIpt, setUserIpt] = useState(defaultUserIpt);

  const [reload, setReload] = useState({
    do: true,
    para: {
      method: 'POST',
      url: config.apiEndpoint + config.device['find'],
      data: query_express_id ? { express_id: query_express_id } : null,
    },
  });

  return (
    <Layout.Content
      style={{
        width: '100%',
        padding: 36,
        margin: '0 auto',
      }}
    >
      <Card style={{ marginBottom: '24px' }}>
        <QueryFilter
          defaultCollapsed={false}
          onReset={() => {
            setUserIpt(defaultUserIpt);
            setReload({
              do: !reload.do,
              para: { ...reload.para, data: null },
            });
          }}
          onFinish={async () => {
            console.log(userIpt);
            const formatPayload = {
              ...userIpt,
              date_range: userIpt.date_range.map((m) =>
                moment(m).format('YYYY-MM-DD'),
              ),
            };
            setReload({
              do: !reload.do,
              para: { ...reload.para, data: JSON.stringify(formatPayload) },
            });
          }}
        >
          <Form.Item label="Terminal SN">
            <Select
              showSearch
              value={userIpt.terminal_sn}
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onSelect={(val) => setUserIpt({ ...userIpt, terminal_sn: val })}
              filterOption={(input, { children }) => {
                return children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Form.Item>
          <Form.Item label="TimeRangePicker">
            <DatePicker.RangePicker
              placeholder={['开始时间', '结束时间']}
              value={userIpt.date_range}
              onCalendarChange={(val) =>
                setUserIpt({ ...userIpt, date_range: val })
              }
              onChange={(val) =>
                setUserIpt({
                  ...userIpt,
                  date_range: val,
                })
              }
            />
          </Form.Item>
        </QueryFilter>
      </Card>
      <ProTable
        columns={staticColumns}
        rowKey="key"
        columnEmptyText={false}
        bordered
        tableLayout="fixed"
        search={false}
        pagination={{
          defaultPageSize: 5,
          defaultCurrent: 1,
          pageSizeOptions: [5, 10, 20, 50],
        }}
        options={{
          fullScreen: true,
          reload: false,
          setting: true,
          density: true,
        }}
        params={reload}
        request={async () => {
          try {
            const { data: responseData } = await axios(reload.para);
            // handle responseData ...
            return { data: responseData, success: true };
          } catch (ex) {
            message.error('查询数据失败');
            console.log('加载表格数据失败 =>', ex);
            return { data: [], success: false };
          }
        }}
        toolbar={{
          menu: {
            type: 'inline',
            items: [
              {
                key: 'action',
                label: (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="@output">
                          <Button
                            onClick={() =>
                              confirm({
                                title: '批量导出',
                                icon: <ExclamationCircleOutlined />,
                                content:
                                  '当前选中的设备生成EXCEL文件,导出至本地',
                                onOk() {
                                  outputExcel({
                                    uri: config.device['@output'],
                                    payload: para.logger.selectedRows,
                                    fileName: `批量导出设备`,
                                    tipText: {
                                      success: '批量导出成功',
                                      error: '批量导出失败',
                                    },
                                  });
                                },
                                onCancel() {},
                              })
                            }
                          >
                            批量导出
                          </Button>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button>
                      批量操作 <DownOutlined />
                    </Button>
                  </Dropdown>
                ),
              },
            ],
          },
        }}
      />
    </Layout.Content>
  );
}

export default connect((paraIn) => {
  return { logger: paraIn['logger'] };
})(LoggerPage);
