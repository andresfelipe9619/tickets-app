import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import MyTickets from "./MyTickets";
import Ticket from "./Ticket";

import { Route, Switch } from "react-router-dom";
import API from "../../services/api";
class Tickets extends Component {
  state = {
    tickets: [],
    isModalOpen: {
      create: false,
      update: false
    },
    currentTicket: null
  };

  async componentDidMount() {
    // const { alert } = this.props;
    this.getMyTickets();
  }

  async getMyTickets() {
    let res = await fetch(
      "https://www.eventbriteapi.com/v3/users/me/orders/?expand=event.logo&token=NRRVEMMABESBCXATHVRO"
    );
    if (res.ok) {
      let json = await res.json();
      let { orders } = json;
      console.log("res", json);

      this.setState({ tickets: orders });
    }
  }

  createTicket = async ticket => {
    let res = await API.Ticket.create(ticket);
    if (res.ok) {
      this.getMyTickets();
    }
  };

  viewTicket = ticket => {
    this.setCurrentTicket(ticket);
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  updateTicket = async ticket => {
    let res = await API.Ticket.update(ticket);
    if (res.ok) {
      this.getMyTickets();
    }
  };

  deleteTicket = async ticket => {
    let res = await API.Ticket.delete(ticket._id);
    if (res.ok) {
      this.getMyTickets();
    }
  };

  setCurrentTicket = ticket => {
    if (!ticket) return;
    this.setState({ currentTicket: ticket });
  };

  openModal = modal => () => {
    this.setState({ isModalOpen: { [modal]: true } });
  };

  closeModal = modal => () => {
    this.setState({ isModalOpen: { [modal]: false } });
  };

  handleOnCreate = ticket => {
    console.log("ticket", ticket);
    if (!ticket) return;
    this.createTicket(ticket);
  };

  handleOnUpdate = ticket => e => {
    console.log("ticket", ticket);
    if (!ticket) return;
    this.setCurrentTicket(ticket);
    this.openModal("update")();
  };

  handleOnView = ticket => e => {
    console.log("ticket", ticket);
    if (!ticket) return;
    this.viewTicket(ticket);
  };

  handleOnDelete = ticket => e => {
    console.log("ticket", ticket);
    if (!ticket) return;
    this.deleteTicket(ticket);
  };

  render() {
    const { tickets } = this.state;
    const { match } = this.props;
    if (!tickets) return null;
    const handlers = {
      handleOnView: this.handleOnView,
      handleOnCreate: this.handleOnCreate,
      handleOnUpdate: this.handleOnUpdate,
      handleOnDelete: this.handleOnDelete
    };

    return (
      <Container>
        <Grid style={{ marginTop: "100px" }}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Switch>
                <Route
                  exact
                  path={`${match.url}`}
                  component={props => (
                    <MyTickets actions {...props} {...{ handlers, tickets }} />
                  )}
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
