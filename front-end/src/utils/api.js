import axios from "axios";

const apiClient = (function(token) {
  const instance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });

  return {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete
  }
});

export default apiClient;
