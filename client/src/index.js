import React from "react";
import App from "./App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { history } from "./store/history";
import configStore from "./store/configStore";
// import "normalize.css";

const store = configStore();
// const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  window.document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
