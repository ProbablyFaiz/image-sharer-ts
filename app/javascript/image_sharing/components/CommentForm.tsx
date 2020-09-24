import React, {Component, Fragment} from 'react';
import CommentsStore from "../stores/CommentsStore";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

interface CommentFormProps {
  commentsStore: CommentsStore;
}

interface CommentFormState {
  draftComment: string;
}

class CommentForm extends Component<CommentFormProps, CommentFormState> {
  constructor(props) {
    super(props);
    this.state = { draftComment: '' };
  }

  render() {
    return (
      <Fragment>
        <Form onSubmit={_ => this.submitComment()}>
          <FormGroup>
            <Label for="commentText">New Comment:</Label>
            <Input type="text" name="commentText" id="commentText" placeholder="Your comment" value={this.state.draftComment} onChange={e => this.setState({ draftComment: e.target.value })}  />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Submit</Button>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }

  private async submitComment() {
    await this.props.commentsStore.submitComment(this.state.draftComment);
    this.setState({ draftComment: '' });
  }
}

export default CommentForm;
