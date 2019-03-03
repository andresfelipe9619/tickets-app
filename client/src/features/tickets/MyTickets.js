import React, { PureComponent } from "react";
import { Grid, Divider, Header } from "semantic-ui-react";
import TicketsList from "./TicketsList";
import API from "../../services/api";

class MyTickets extends PureComponent {
  state = {
    tickets: [],
    isModalOpen: {
      create: false,
      update: false
    },
    currentTicket: null
  };
  componentDidMount() {
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

  viewEvent = ticket => {
    // this.setCurrentTicket(ticket);
    // window.scrollTo({ top: 800, behavior: "smooth" });
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

  handleOnViewEvent = ticket => e => {
    console.log("ticket", ticket);
    if (!ticket) return;
    this.viewEvent(ticket);
  };

  handleOnDelete = ticket => e => {
    console.log("ticket", ticket);
    if (!ticket) return;
    this.deleteTicket(ticket);
  };
  render() {
    const { tickets } = this.state;
    if (!tickets) return null;
    const handlers = {
      handleOnViewEvent: this.handleOnViewEvent,
      handleOnCreate: this.handleOnCreate,
      handleOnUpdate: this.handleOnUpdate,
      handleOnDelete: this.handleOnDelete
    };
    return (
      <Grid>
        <Grid.Row>
          <Header as="h1">My Tickets</Header>
          <Divider />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <TicketsList {...{ handlers, tickets }} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default MyTickets;
