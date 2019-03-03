import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { SemanticToastContainer } from "react-semantic-toasts";
import Navbar from "./features/home/Navbar.js";
import { connect } from "react-redux";
import { PageNotFound, PrivateRoute, ErrorBoundary } from "./features/common";
import {
  LoadableMyTickets,
  LoadableMyEvents,
  LoadableHome,
  LoadableLogin,
  LoadableRegister,
  LoadableProfile,
  LoadableEvent
} from "./features";

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Navbar>
          <Switch>
            <Route exact path="/" component={LoadableHome} />
            <Route path="/events" component={LoadableEvent} />
            <Route path="/mytickets" component={LoadableMyTickets} />
            <Route path="/myevents" component={LoadableMyEvents} />
            <Route exact path="/register" component={LoadableRegister} />
            <Route exact path="/login" component={LoadableLogin} />
            <PrivateRoute exact path="/profile" component={LoadableProfile} />
            <Route component={PageNotFound} />
          </Switch>
          <SemanticToastContainer position="bottom-right" />
        </Navbar>
      </ErrorBoundary>
    );
  }
}
function mapStateToProps(state) {
  return {
    alert: state.alert
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
