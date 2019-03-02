import React, { Component } from "react";
import { Grid, Header, Container } from "semantic-ui-react";
import DataTable from "../../components/tables/DataTable";
// import { toast } from "react-semantic-toasts";
// import TicketRow from "./TicketRow";
import { connect } from "react-redux";
import CreateTicketModal from "../../components/modals/ticket/CreateTicket";
import UpdateTicketModal from "../../components/modals/ticket/UpdateTicket";
import API from "../../services/api";
class Ticket extends Component {
  state = {
    income: 0,
    expense: 0,
    ticketed: 0,
    tickets: [],
    isModalOpen: {
      create: false,
      update: false
    },
    currentTicket: null
  };

  async componentDidMount() {
    const { alert } = this.props;
    this.getTickets();
    if (alert && alert.message) {
      // toast({
      //     type: alert.typresolve,
      //     icon: alert.icon,
      //     title: alert.type + "Toast",
      //     description: alert.message,
      //     time: 5000
      // });
    }
  }

  async getTickets() {
    let res = await API.Ticket.getAll();
    if (res.ok) {
      let { tickets } = res;
      this.setState({ tickets });
    }
  }

  createTicket = async ticket => {
    let res = await API.Ticket.create(ticket);
    if (res.ok) {
      this.getTickets();
    }
  };

  viewTicket = ticket => {
    this.setCurrentTicket(ticket);
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  updateTicket = async ticket => {
    let res = await API.Ticket.update(ticket);
    if (res.ok) {
      this.getTickets();
    }
  };

  deleteTicket = async ticket => {
    let res = await API.Ticket.delete(ticket._id);
    if (res.ok) {
      this.getTickets();
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
    const { tickets, isModalOpen, currentTicket } = this.state;
    if (!tickets) return null;
    const handlers = {
      handleOnView: this.handleOnView,
      handleOnCreate: this.handleOnCreate,
      handleOnUpdate: this.handleOnUpdate,
      handleOnDelete: this.handleOnDelete
    };

    let { income, expense } = tickets.reduce(
      (prev, b) =>
        b.nature === "income"
          ? { ...prev, income: prev.income + parseInt(b.limit, 10) }
          : b.nature === "expense"
          ? { ...prev, expense: prev.expense + parseInt(b.limit, 10) }
          : prev,
      { income: 0, expense: 0 }
    );

    let saved = income - expense;

    return (
      <Container>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={16}>
              {/* <TicketRow
                                saved={saved}
                                income={income}
                                expense={expense}
                                openModal={this.openModal("create")}
                                {...handlers}
                            /> */}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered style={{ marginTop: "100px" }}>
            <Grid.Column width={16}>
              {tickets && tickets.length > 0 ? (
                <DataTable actions handlers={handlers} data={tickets} />
              ) : (
                <p>There's nothing budgted yet, try to create something?</p>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row
            centered
            style={{
              marginTop: "100px",
              marginBottom: currentTicket ? "0px" : "300px"
            }}
          >
            <Grid.Column width={16}>
              <Header>
                {currentTicket && currentTicket.name
                  ? `Transacciones en ${currentTicket.name}`
                  : `Selecciona un presupuesto`}
              </Header>
              {currentTicket && tickets.length > 0 ? (
                <DataTable actions handlers={handlers} data={tickets} />
              ) : (
                <p>There are no transactions</p>
              )}
            </Grid.Column>
          </Grid.Row>
          <CreateTicketModal
            open={isModalOpen.create}
            closeModal={this.closeModal("create")}
            handleOnConfirm={handlers.handleOnCreate}
          />
          <UpdateTicketModal
            ticket={currentTicket || null}
            open={isModalOpen.update}
            closeModal={this.closeModal("update")}
            handleOnConfirm={this.updateTicket}
          />
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
export default connect(mapStateToProps)(Ticket);
