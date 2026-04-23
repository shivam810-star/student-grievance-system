import axios from "axios";

const API = axios.create({
  baseURL: "https://student-grievance-system-2.onrender.com/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;