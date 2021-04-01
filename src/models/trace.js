import io from 'socket.io-client';

export default {
  namespace: 'trace',
  state: {
    register: {
      snr_weak: 30,
      snr_normal: 38,
      snr_alert: 38,
    },
    reload: true,
    traces: [], //
  },
  reducers: {
    set_reload(state, { payload: obj }) {
      let [beforeTrace] = state.traces.slice(-1);
      if (!beforeTrace) beforeTrace = {};
      const trace = {
        ...obj,
        get key() {
          return this.packege_time;
        },
        get avg() {
          let arr = this.satellites.match(/(?<=:)\d+/g);
          if (!arr) arr = [];
          const sum = arr.reduce((cur_sum, n) => cur_sum + Number(n), 0);
          return sum / arr.length;
        },
        get desc() {
          const { snr_alert, snr_weak, snr_normal } = state.register;
          const bf_avg = beforeTrace.avg;
          if (bf_avg && Math.abs(bf_avg - this.avg) > snr_alert) return 'alert';
          if (this.avg < snr_weak) return 'weak';
          return this.avg < snr_normal ? 'normal' : 'strong';
        },
      };
      return {
        ...state,
        beforeTrace,
        reload: !state.reload,
        traces: state.traces.concat(trace),
      };
    },
    set_register(state, { payload: register }) {
      return { ...state, register };
    },
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.includes('/trace')) {
          console.log('尝试连接Websocket服务端');

          const socket = io('ws://172.16.2.52:28009', {
            path: '/push/2.0/socket.io',
            query: {
              push_id: '8ad3fa99ed274eafad0e0a35002a185b',
              psd: '8ad3fa99ed274eafad0e0a35002a185b::1617154805802',
            },
          });

          socket.on('api/resp', (msg) => {
            const obj = JSON.parse(msg.data);
            obj.packege_time = new Date().getTime();
            console.log('obj=>', obj);
            dispatch({ type: 'set_reload', payload: obj });
          });
        }
      });
    },
  },
};
