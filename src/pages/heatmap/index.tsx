import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Map } from 'react-amap';
import Heatmap from 'react-amap-plugin-heatmap';

// config props
const visible = true;
const radius = 30;
// TODO: 根据不同的信号值显示不同渐变色
const gradient = {
  0.5: 'blue',
  0.65: 'rgb(117,211,248)',
  0.7: 'rgb(0, 255, 0)',
  0.9: '#ffea00',
  1.0: 'red',
};
const zooms = [3, 18];

function index({ dvaState: { throttledTraces } }) {
  const [avgs, setAvgs] = useState([]);
  console.log(avgs);
  useEffect(() => {
    if (throttledTraces.length) {
      setAvgs(
        throttledTraces.map(({ lat, lon, avg }) => ({
          lat,
          lng: lon,
          count: 50 - avg,
        })),
      );
    }
  }, [throttledTraces]);

  const dataSet = {
    data: avgs,
    // max: 100,
  };
  const pluginProps = {
    visible,
    radius,
    gradient,
    zooms,
    dataSet,
  };

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <Map
        amapkey="3ca715c22f1f3519b3dbe27d3af91ff5"
        zoom={6}
        plugins={['ToolBar']}
      >
        <Heatmap {...pluginProps} />
      </Map>
    </div>
  );
}

export default connect(({ trace }) => {
  return { dvaState: trace };
})(index);
