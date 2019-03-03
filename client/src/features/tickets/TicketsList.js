import React, { PureComponent } from "react";
import { Card } from "semantic-ui-react";

const TicketItem = ({ ticket }) => {
  const { id, event } = ticket;
  const { logo, name, start, end, created } = event;
  const img =
    (logo && logo.url) ||
    "https://react.semantic-ui.com/images/wireframe/image.png";
  const description = `Starts: ${new Date(start.utc).toDateString()}
      Ends: ${new Date(end.utc).toDateString()}
      Ticket n° ${id} del ${new Date(created).toDateString()}`;
  return (
    <Card
      image={img}
      href={`/mytickets/${id}`}
      header={name.text}
      raised
      meta="Event"
      description={description}
    />
  );
};

export default class TicketsList extends PureComponent {
  render() {
    const { tickets } = this.props;
    return tickets && tickets.length > 0 ? (
      <Card.Group>
        {" "}
        {tickets.map(t => (
          <TicketItem ticket={t} key={t.id} />
        ))}
      </Card.Group>
    ) : tickets && tickets.length === 0 ? (
      <p>There are not tickets for you</p>
    ) : null;
  }
}
