import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
interface interceptorHook<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}
interface WBRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: interceptorHook<T>;
}
export default class WBRequest {
  instance: AxiosInstance;
  options: WBRequestConfig;
  constructor(config: WBRequestConfig) {
    this.instance = axios.create(config);
    this.options = config;
    this.setupInterceptor();
  }
  setupInterceptor(): void {
    /* 默认实例拦截器 */
    this.instance.interceptors.request.use(
      this.options?.interceptors?.requestInterceptor,
      this.options?.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.options?.interceptors?.responseInterceptor,
      this.options?.interceptors?.responseInterceptorCatch
    );
    /*默认类拦截器*/
    this.instance.interceptors.request.use(
      (config) => {
        console.log("默认请求拦截器");
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log("默认响应拦截器");
        return res;
      },
      (err) => {
        return err;
      }
    );
  }
  request<T = any>(config: WBRequestConfig): Promise<T> {
    /* 针对每次请求的拦截器 */
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config);
    }
    return new Promise((resolve, reject) => {
      return this.instance.request<any, any>(config).then(
        (res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res);
          }
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
