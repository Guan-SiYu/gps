import { Map, Polygon, Markers, Polyline } from 'react-amap';
import React, { useRef, useState } from 'react';
import _ from 'lodash';
import {
  QueryFilter,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { Space, Form, message } from 'antd';
import { staticColumns } from './util';
import { connect } from 'dva';

function TracePage({ dva_, dispatch }) {
  const dva_register = dva_.register || {};
  const markers = dva_.traces.map((trace, idx) => {
    const { lon: longitude, lat: latitude } = trace;
    return {
      position: { longitude, latitude },
      idx,
      data: trace,
    };
  });
  const paths = dva_.traces.map((trace) => {
    const { lon: longitude, lat: latitude } = trace;
    return { longitude, latitude };
  });
  function mockMarkers() {
    const mockdata = [
      [116.368904, 39.923423],
      [116.382122, 39.921176],
      [116.387271, 39.922501],
      [116.398258, 39.9146],
    ];
    return mockdata.map((arr, idx) => {
      const [lon, lat] = arr;
      return {
        position: {
          longitude: lon,
          latitude: lat,
        },
        idx,
      };
    });
  }

  function mockPaths() {
    const mockdata = [
      [116.368904, 39.923423],
      [116.382122, 39.921176],
      [116.387271, 39.922501],
      [116.398258, 39.9146],
    ];
    return mockdata.map((arr, idx) => {
      const [lon, lat] = arr;
      return {
        longitude: lon,
        latitude: lat,
      };
    });
  }

  return (
    <ProCard direction="column" ghost gutter={[0, 18]}>
      <ProCard>
        <QueryFilter>
          <Form.Item label="Tracking terminal">
            <ProFormSelect
              name="tracking_terminal"
              showSearch
              valueEnum={
                dva_register.terminals
                  ? dva_register.terminals.reduce((curobj, item) => {
                      curobj[item] = item;
                      return curobj;
                    }, {})
                  : { 无选项: '无选项' }
              }
            />
          </Form.Item>
          <Form.Item label="时间区间">
            <ProFormDateRangePicker name="create" colSize={3} />
          </Form.Item>
        </QueryFilter>
      </ProCard>
      <div style={{ width: '100%', height: '80vh' }}>
        <Map
          amapkey="3ca715c22f1f3519b3dbe27d3af91ff5"
          plugins={['ToolBar']}
          //   center={randomPosition()}
          zoom={6}
        >
          <Markers
            // useCluster={true}
            markers={mockMarkers()}
            events={{
              click: (e, marker) => {
                const { idx, data } = marker.getExtData();
                alert(`点击的是${idx}号坐标点`);
              },
            }}
          />
          <Polyline path={mockPaths()} />
        </Map>
      </div>

      <ProTable
        columnEmptyText={false}
        bordered
        search={false}
        columns={staticColumns}
        params={dva_.reload}
        request={async () => {
          try {
            return { data: dva_.traces, success: true };
          } catch (ex) {
            message.error('查询数据失败');
            console.log('加载表格数据失败 =>', ex);
            return { data: [], success: false };
          }
        }}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys }) => {
          return (
            <Space size={24}>
              <span>已选 {selectedRowKeys.length} 项</span>
            </Space>
          );
        }}
        rowKey="key"
        // actionRef={actionRef}
        tableLayout="fixed"
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
        toolbar={{
          menu: {
            type: 'inline',
          },
        }}
      />
    </ProCard>
  );
}

export default connect((paraIn) => {
  return { dva_: paraIn['trace'] };
})(TracePage);
