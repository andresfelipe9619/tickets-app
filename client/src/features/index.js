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

export const LoadableTicket = loadable({
  loader: () => import("./ticket/Ticket"),
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
