import axios, { type AxiosRequestConfig } from "axios";
import { env } from "@/shared/constants/env";

// Extend options để hỗ trợ baseURL tùy chỉnh và cờ điều khiển
interface RequestOptions extends AxiosRequestConfig {
  customBaseURL?: string;
  isSecure?: boolean;
  noCleanProps?: boolean;
}

// Hàm làm sạch object khỏi các giá trị null/undefined/empty string/empty object
const cleanProps = (payload: any): any => {
  if (payload === null || typeof payload !== "object") return payload;

  const cleaned: Record<string, any> = {};
  for (const key in payload) {
    const value = payload[key];

    const isEmptyObject =
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0 &&
      value.constructor === Object;

    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !isEmptyObject
    ) {
      cleaned[key] = value;
    }
  }
  return cleaned;
};

// Axios mặc định với base URL chính
const defaultInstance = axios.create({
  baseURL: env.BASE_API_URL,
  timeout: 60000,
});

// Hàm gọi API tổng quát
export const request = async (
  method: string,
  path: string,
  options: RequestOptions = {}
) => {
  const {
    customBaseURL,
    isSecure = true,
    noCleanProps = false,
    headers,
    params,
    data,
    ...rest
  } = options;

  const instance = customBaseURL
    ? axios.create({
        baseURL: customBaseURL,
        timeout: 60000,
      })
    : defaultInstance;

  const config: AxiosRequestConfig = {
    method,
    url: path,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    params: noCleanProps ? params : cleanProps(params),
    data: noCleanProps ? data : cleanProps(data),
    ...rest,
  };

  const response = await instance.request(config);
  return response.data;
};

// Các hàm gọi tắt
export const reqGET = (
  path: string,
  params?: any,
  options?: RequestOptions
) => {
  return request("GET", path, { ...options, params });
};

export const reqPOST = (path: string, data?: any, options?: RequestOptions) => {
  return request("POST", path, { ...options, data });
};

export const reqPUT = (path: string, data?: any, options?: RequestOptions) => {
  return request("PUT", path, { ...options, data });
};

export const reqDELETE = (
  path: string,
  data?: any,
  options?: RequestOptions
) => {
  return request("DELETE", path, { ...options, data });
};

export const reqPATCH = (
  path: string,
  data?: any,
  options?: RequestOptions
) => {
  return request("PATCH", path, { ...options, data });
};
