import React, { PureComponent } from "react";
import { Grid, Divider, Header } from "semantic-ui-react";
import TicketsList from "./TicketsList";

class MyTickets extends PureComponent {
  state = {
    tickets: [],
    isModalOpen: {
      create: false,
      update: false
    },
    currentTicket: null
  };

  render() {
    const { handlers, tickets } = this.props;

    if (!tickets) return null;
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
