import axios from "axios";

const api = (function() {
  const instance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
  });

  return {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete
  }
})();

export default api;
