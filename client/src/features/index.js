import { default as loadable } from "react-loadable";
import { Loading } from "./common";

export const LoadableHome = loadable({
  loader: () => import("./home/Home"),
  loading: Loading
});

export const LoadableProfile = loadable({
  loader: () => import("./profile/Profile"),
  loading: Loading
});

export const LoadableMyTickets = loadable({
  loader: () => import("./tickets"),
  loading: Loading
});

export const LoadableMyEvents = loadable({
  loader: () => import("./event/MyEvents"),
  loading: Loading
});

export const LoadableEvent = loadable({
  loader: () => import("./event/Event"),
  loading: Loading
});

export const LoadableLogin = loadable({
  loader: () => import("./login/Login"),
  loading: Loading
});

export const LoadableRegister = loadable({
  loader: () => import("./register/Register"),
  loading: Loading
});

export const LoadableReports = loadable({
  loader: () => import("./report/Reports"),
  loading: Loading
});
