import React, { PureComponent } from "react";
import UpdateTicketModal from "../../components/modals/ticket/UpdateTicket";
import { Grid, Divider, Header, Button, List } from "semantic-ui-react";
class Ticket extends PureComponent {
  state = {
    currentTicket: null,
    isModalOpen: {
      create: false,
      update: false
    }
  };
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    if (params && params.id) {
      this.getTicketById(params.id);
    }
  }
  openModal = modal => () => {
    console.log("modal", modal);
    this.setState({ isModalOpen: { [modal]: true } });
  };

  printTicket = e => {
    window.print();
  };

  closeModal = modal => () => {
    this.setState({ isModalOpen: { [modal]: false } });
  };
  getTicketById = async ticketId => {
    let res = await fetch(
      `https://www.eventbriteapi.com/v3/orders/${ticketId}/?expand=event.logo&token=NRRVEMMABESBCXATHVRO`
    );
    if (res.ok) {
      let json = await res.json();
      const order = json;
      console.log("order", order);
      this.setState({ currentTicket: order });
    }
  };

  render() {
    const { currentTicket, isModalOpen } = this.state;
    if (!currentTicket) return null;
    const { id, event, first_name, last_name, email } = currentTicket;
    const { name, start, end, created } = event;
    const description = `Starts: ${new Date(start.utc).toDateString()}
      Ends: ${new Date(end.utc).toDateString()}`;
    return (
      <Grid>
        <Grid.Row>
          <Header as="h1">
            Request of {name.text}
            <Header.Subheader>{`Ticket N° ${id} ${description}`}</Header.Subheader>
          </Header>
        </Grid.Row>
        <Divider />

        <Grid.Row>
          <Grid.Column width={4}>
            <Button.Group vertical size="big">
              <Button
                content="Print Tickets"
                onClick={this.printTicket}
                icon="print"
                primary
              />
              <Button content="Cancel Ticket" icon="cancel" secondary />
              <Button content="Contact owner" icon="mail" secondary />
            </Button.Group>
          </Grid.Column>
          <Divider />
          <Grid.Column width={12}>
            <Grid.Row>
              <Grid.Column width={12}>
                <Header as="h2">{`Ticket ${name.text} - Free`}</Header>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button
                  onClick={this.openModal("update")}
                  floated="right"
                  icon="edit"
                  primary
                  content="edit"
                />
              </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h3">Contact Information</Header>
                <List>
                  <List.Item>
                    <List.Header>Fisrt Name</List.Header>
                    {first_name}
                  </List.Item>
                  <List.Item>
                    <List.Header>Last Name</List.Header>
                    {last_name}
                  </List.Item>
                  <List.Item>
                    <List.Header>Email</List.Header>
                    {email}
                  </List.Item>
                  <List.Item>
                    <List.Header>San Francisco</List.Header>
                    What a lovely city
                  </List.Item>
                </List>
              </Grid.Column>{" "}
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>

        <UpdateTicketModal
          ticket={currentTicket || null}
          open={isModalOpen.update}
          closeModal={this.closeModal("update")}
          handleOnConfirm={this.updateBudget}
        />
      </Grid>
    );
  }
}

export default Ticket;
