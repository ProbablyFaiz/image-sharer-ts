import { action } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { useStore } from '../stores/index';

const FeedbackForm = observer(() => {
  const { feedbackStore } = useStore();

  const onSubmit = action((event: React.FormEvent) => {
    event.preventDefault();
    feedbackStore.onSubmit();
  });

  return (
    <Form onSubmit={onSubmit}>
      {feedbackStore.alert.message &&
        <Alert color={feedbackStore.alert.level}>{feedbackStore.alert.message}</Alert>
      }
      <FormGroup>
        <Label for="userName">Username:</Label>
        <Input type="text" name="userName" id="userName" placeholder="Your username" value={feedbackStore.userName} onChange={feedbackStore.onChange} />
      </FormGroup>
      <FormGroup>
        <Label for="comments">Comments</Label>
        <Input type="textarea" name="comments" id="comments" value={feedbackStore.comments} onChange={feedbackStore.onChange} />
      </FormGroup>
      <FormGroup>
        <Button type="Submit">Submit</Button>
      </FormGroup>
    </Form>
  );
});

export default FeedbackForm;
