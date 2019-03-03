import React from "react";
import { Form, Button, Message, Grid, Icon, Segment } from "semantic-ui-react";
import withSemanticUIFormik from "../../hoc/FormikSUI";
import * as Yup from "yup";

const MyInnerForm = props => {
  const {
    errors,
    submitText,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleOnCancel,
    values: { first_name, limit, last_name, email }
  } = props;
  return (
    <Grid
      style={{
        height: "100%"
      }}
      verticalAlign="middle"
      centered
    >
      <Grid.Row centered>
        <Grid.Column width={16}>
          <Segment>
            {Object.keys(errors).length > 0 ? (
              <Message
                error
                header="Campos invalidos"
                list={Object.keys(errors).map(key => errors[key])}
              />
            ) : null}
            <Form size="large" onSubmit={handleSubmit} loading={isSubmitting}>
              <Form.Group widths="equal">
                <Form.Input
                  label="First Name"
                  labelPosition="left"
                  value={first_name}
                  fluid
                  type="text"
                  name="first_name"
                  iconPosition="left"
                  placeholder="your name..."
                  onChange={handleChange}
                />
                <Form.Input
                  label="Last Name"
                  labelPosition="left"
                  type="text"
                  fluid
                  iconPosition="left"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  label="Email"
                  labelPosition="left"
                  fluid
                  iconPosition="left"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
                <Form.Input
                  label="limit"
                  labelPosition="left"
                  type="text"
                  fluid
                  iconPosition="left"
                  name="limit"
                  value={limit}
                  placeholder="limit..."
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="button" color="red" onClick={handleOnCancel}>
                <Icon name="remove" /> Cancel
              </Button>

              <Button type="submit" color="green">
                <Icon name="checkmark" /> {submitText || "No hay acción"}
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const TicketForm = withSemanticUIFormik({
  mapPropsToValues: ({ ticket }) => ({
    first_name: (ticket && ticket.first_name) || "weed",
    last_name: (ticket && ticket.last_name) || "2019-01-01",
    email: (ticket && ticket.email) || "2020-01-01",
    limit: (ticket && ticket.limit) || 0
  }),
  validationSchema: Yup.object().shape({
    first_name: Yup.string().required("first_name is requerid!"),
    limit: Yup.number().required("limit is required!"),
    email: Yup.date().required("End date is required!"),
    last_name: Yup.date().required("Start date is required!")
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    setTimeout(() => {
      console.log("values", values);
      if (!props.ticket) {
        props.handleOnConfirm(values);
      } else {
        props.handleOnConfirm({ ...values, _id: props.ticket._id });
      }
      props.handleOnCancel();
      setSubmitting(false);
    }, 1000);
  },
  displayName: "TicketForm"
})(MyInnerForm);

export default TicketForm;
