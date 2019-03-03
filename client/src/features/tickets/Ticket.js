import React, { Component } from "react";
import { Grid, Divider, Header, Container, Button } from "semantic-ui-react";
class Ticket extends Component {
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
    // this.getMyTickets();
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Header as="h1">Ticket N° </Header>
          <Divider />
        </Grid.Row>
        <Grid.Row divided>
          <Grid.Column width={4}>
            <Button.Group vertical size="big">
              <Button content="Print Tickets" icon="print" primary />
              <Button content="Cancel Ticket" icon="cancel" secondary />
              <Button content="Contact owner" icon="mail" secondary />
            </Button.Group>
          </Grid.Column>
          <Grid.Column divided width={12}>
            <Grid.Row divided>
              <Grid.Column width={12}>
                <Header as="h2">TIYULO IMPORTANTE</Header>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button floated="right" primary>
                  Edit
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h3">Contact Information</Header>
              </Grid.Column>{" "}
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Ticket;
