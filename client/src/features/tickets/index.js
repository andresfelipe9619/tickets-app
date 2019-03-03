import React, { PureComponent } from "react";
import { Grid, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import MyTickets from "./MyTickets";
import Ticket from "./Ticket";

import { Route, Switch } from "react-router-dom";
class Tickets extends PureComponent {
  render() {
    const { match } = this.props;
    return (
      <Container>
        <Grid style={{ marginTop: "100px" }}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Switch>
                <Route
                  exact
                  path={`${match.url}`}
                  component={props => <MyTickets {...props} />}
                />
                <Route
                  exact
                  path={`${match.url}/:id`}
                  component={props => <Ticket {...props} />}
                />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    alert: state.alert,
    user: state.authService.loginSuccess
  };
}
export default connect(mapStateToProps)(Tickets);
