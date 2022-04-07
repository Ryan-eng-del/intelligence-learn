import WBRequest from "./request/request";
export default new WBRequest({
  baseURL: "http://123.207.32.32:9001/",
  timeout: 1000,
  interceptors: {
    requestInterceptor(config) {
      return config;
    },
    requestInterceptorCatch(err) {
      return err;
    },
    responseInterceptor(res) {
      return res;
    },
    responseInterceptorCatch(err) {
      return err;
    }
  }
});
