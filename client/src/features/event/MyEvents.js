import React, { Component } from "react";
import { Grid, Header, Container } from "semantic-ui-react";
import DataTable from "../../components/tables/DataTable";
// import { toast } from "react-semantic-toasts";
// import EventRow from "./EventRow";
import { connect } from "react-redux";
import CreateEventModal from "../../components/modals/event/CreateEvent";
import UpdateEventModal from "../../components/modals/event/UpdateEvent";
import API from "../../services/api";
class MyEvents extends Component {
  state = {
    events: [],
    isModalOpen: {
      create: false,
      update: false
    },
    currentEvent: null
  };

  async componentDidMount() {
    const { alert } = this.props;
    this.getEvents();
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

  async getEvents() {
    let res = await API.Event.getAll();
    if (res.ok) {
      let { events } = res;
      this.setState({ events });
    }
  }

  createEvent = async event => {
    let res = await API.Event.create(event);
    if (res.ok) {
      this.getEvents();
    }
  };

  viewEvent = event => {
    this.setCurrentEvent(event);
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  updateEvent = async event => {
    let res = await API.Event.update(event);
    if (res.ok) {
      this.getEvents();
    }
  };

  deleteEvent = async event => {
    let res = await API.Event.delete(event._id);
    if (res.ok) {
      this.getEvents();
    }
  };

  setCurrentEvent = event => {
    if (!event) return;
    this.setState({ currentEvent: event });
  };

  openModal = modal => () => {
    this.setState({ isModalOpen: { [modal]: true } });
  };

  closeModal = modal => () => {
    this.setState({ isModalOpen: { [modal]: false } });
  };

  handleOnCreate = event => {
    console.log("event", event);
    if (!event) return;
    this.createEvent(event);
  };

  handleOnUpdate = event => e => {
    console.log("event", event);
    if (!event) return;
    this.setCurrentEvent(event);
    this.openModal("update")();
  };

  handleOnView = event => e => {
    console.log("event", event);
    if (!event) return;
    this.viewEvent(event);
  };

  handleOnDelete = event => e => {
    console.log("event", event);
    if (!event) return;
    this.deleteEvent(event);
  };

  render() {
    const { events, isModalOpen, currentEvent } = this.state;
    if (!events) return null;
    const handlers = {
      handleOnView: this.handleOnView,
      handleOnCreate: this.handleOnCreate,
      handleOnUpdate: this.handleOnUpdate,
      handleOnDelete: this.handleOnDelete
    };

    return (
      <Container>
        <Grid divided>
          <Grid.Row centered style={{ marginTop: "100px" }}>
            <Grid.Column width={16}>
              {events && events.length > 0 ? (
                <DataTable actions handlers={handlers} data={events} />
              ) : (
                <p>There's nothing budgted yet, try to create something?</p>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row
            centered
            style={{
              marginTop: "100px",
              marginBottom: currentEvent ? "0px" : "300px"
            }}
          >
            <Grid.Column width={16}>
              <Header>
                {currentEvent && currentEvent.name
                  ? `Transacciones en ${currentEvent.name}`
                  : `Selecciona un presupuesto`}
              </Header>
              {currentEvent && events.length > 0 ? (
                <DataTable actions handlers={handlers} data={events} />
              ) : (
                <p>There are no transactions</p>
              )}
            </Grid.Column>
          </Grid.Row>
          <CreateEventModal
            open={isModalOpen.create}
            closeModal={this.closeModal("create")}
            handleOnConfirm={handlers.handleOnCreate}
          />
          <UpdateEventModal
            event={currentEvent || null}
            open={isModalOpen.update}
            closeModal={this.closeModal("update")}
            handleOnConfirm={this.updateEvent}
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
export default connect(mapStateToProps)(MyEvents);
