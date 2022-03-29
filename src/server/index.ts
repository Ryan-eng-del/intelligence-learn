import WBRequest from "./request/request";
export default new WBRequest({
  baseURL: "http://123.207.32.32:9001/",
  timeout: 1000,
  interceptors: {
    requestInterceptor(config) {
      console.log("默认实例请求拦截器");
      return config;
    },
    requestInterceptorCatch(err) {
      return err;
    },
    responseInterceptor(res) {
      console.log("默认实例响应拦截");
      return res;
    },
    responseInterceptorCatch(err) {
      return err;
    }
  }
});
