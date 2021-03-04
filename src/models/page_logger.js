export default {
  namespace: 'logger',
  state: {
    selectedRows: [],
  },
  reducers: {
    set_selectedRows(state, { payload: selectedRows }) {
      return { ...state, selectedRows };
    },
  },
};
