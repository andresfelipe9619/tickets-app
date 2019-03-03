import React from "react";
import { Header, Modal, Icon } from "semantic-ui-react";

import TicketForm from "./TicketForm";

const UpdateBudgetModal = ({ open, closeModal, handleOnConfirm, ticket }) => (
  <Modal
    closeIcon
    open={open}
    size={"tiny"}
    dimmer={"blurring"}
    onClose={closeModal}
  >
    <Header>
      <Icon size="2x" name="ticket" /> Update your ticket
    </Header>
    <Modal.Content>
      <TicketForm
        ticket={ticket}
        submitText={"Update"}
        handleOnCancel={closeModal}
        handleOnConfirm={handleOnConfirm}
      />
    </Modal.Content>
  </Modal>
);

export default UpdateBudgetModal;
