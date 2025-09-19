import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to inject Bearer token
api.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem("tokens"); // string

    if (storedToken) {
      try {
        const { accessToken } = JSON.parse(storedToken); // parse it
        // console.log("accessToken", accessToken);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (e) {
        console.error("Invalid token in localStorage", e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
