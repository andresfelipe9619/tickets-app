import axios from "axios";
const API_ROOT = "/api";

const server = axios.create({
  baseURL: API_ROOT
});

let token = null;

const tokenInterceptor = config => {
  if (token) {
    config.headers["token"] = token;
  }
  return config;
};

const responseBody = response => response.data;

server.interceptors.request.use(tokenInterceptor, error =>
  Promise.reject(error)
);

const serverRequests = {
  del: url => server.delete(`${url}`).then(responseBody),
  get: url => server.get(`${url}`).then(responseBody),
  put: (url, body) => server.put(`${url}`, body).then(responseBody),
  post: (url, body) => server.post(`${url}`, body).then(responseBody)
};

const Auth = {
  login: user => serverRequests.post("/login", user),
  loginGoogle: user => serverRequests.post("/login/google", user),
  register: user => serverRequests.post("/user", user)
};

const Event = {
  getAll: () => serverRequests.get(`/event`),
  delete: id => serverRequests.del(`/event/${id}`),
  get: id => serverRequests.get(`/event/${id}`),
  update: event =>
    serverRequests.put(`/event/${event.id}`, event),
  create: event => serverRequests.post("/event", event)
};

const Ticket = {
  getAll: () => serverRequests.get(`/ticket`),
  delete: id => serverRequests.del(`/ticket/${id}`),
  get: id => serverRequests.get(`/ticket/${id}`),
  update: ticket => serverRequests.put(`/ticket/${ticket._id}`, ticket),
  create: ticket => serverRequests.post("/ticket", ticket)
};

const User = {
  getAll: () => serverRequests.get(`/user`),
  get: id => serverRequests.get(`/user/${id}`),
  profile: () => serverRequests.get("/user/profile"),
  delete: id => serverRequests.del(`/user/${id}`),
  update: user => serverRequests.put("/user", user)
};

export default {
  Auth,
  User,
  Ticket,
  Event,
  setToken: _token => {
    token = _token;
  }
};
