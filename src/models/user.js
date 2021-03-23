export default {
  namespace: 'user',
  state: {
    curuser: null,
  },
  reducers: {
    set_curuser(state, { payload: curuser }) {
      return { ...state, curuser };
    },
  },
};
