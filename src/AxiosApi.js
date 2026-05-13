import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8111",
});

// 서버로 요청을 보내기 직전에 가로채서 토큰을 넣어줌
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Bearer 방식으로 헤더에 토큰 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
