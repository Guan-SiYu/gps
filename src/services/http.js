import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.response.use(null, (error) => {
  console.log(error.response);
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log('一个不可预期错误发生了', error);
    alert('发生不可预期错误');
  }
  return Promise.reject(error);
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
