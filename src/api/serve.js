import axios from 'axios';
import { Message } from 'element-ui';
const instance = axios.create({
    baseURL: '//localhost' + '/api',
    timeout: 3000,
    credentials: false,
});
// http request 拦截器
// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
instance.interceptors.request.use(
    config => {
        config.headers = Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
          }, config.headers);
          return Promise.resolve(config);
    },
    err => {
      return Promise.reject(err);
  });
  // http response 拦截器
  instance.interceptors.response.use(
    response => {
      //拦截响应，做统一处理 
      let { error_code, error_message } = response.data;
      if (error_code != 0 && error_message) {
        Message({
          message: error_message,
          type: 'error',
          duration: 1000
        });
        return Promise.reject(response.data);
      }
      return response.data;
    },

    //接口错误状态处理，也就是说无响应时的处理
    error => {
      console.log(error);
      let { error_code, error_message } = error.response;
      if (error_code && error_message) {
        Message({
          message: error_message,
          type: 'error',
          duration: 1000
        });
      }
      return Promise.reject(error.response.status); // 返回接口返回的错误信息
  });
  export const createApi = (url, method = 'get', config) => {
    return instance({
      url: url,
      withCredentials: false,
      method,
      ...config
    })
  }