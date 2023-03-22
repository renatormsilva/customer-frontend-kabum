import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/customer-project/api",
  withCredentials: true
})

export default api;