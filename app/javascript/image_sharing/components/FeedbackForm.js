import { action } from 'mobx';
import { observer } from 'mobx-react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import React from 'react';

import { PropTypes } from '../utils/prop-types';
import { useStore } from '../stores/index';

const FeedbackForm = observer(() => {
  const { feedbackStore } = useStore();

  const onSubmit = action((event) => {
    event.preventDefault();
    console.warn({ event, feedbackStore });
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="userName">Username:</Label>
        <Input type="text" name="userName" id="userName" placeholder="Your username" value={feedbackStore.userName} onChange={feedbackStore.onChange} />
      </FormGroup>
      <FormGroup>
        <Label for="comments">Comments</Label>
        <Input type="textarea" name="comments" id="comments" onChange={feedbackStore.onChange} />
      </FormGroup>
      <FormGroup>
        <Button type="Submit">Submit</Button>
      </FormGroup>
    </Form>
  );
});

FeedbackForm.propTypes = {
  userName: PropTypes.string
};

export default FeedbackForm;
