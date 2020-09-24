import {observer} from "mobx-react";
import React, {Component, Fragment} from 'react';

@observer
class CommentsList extends Component {
  render() {
    return (
      <Fragment>
        <h2>Comments</h2>
      </Fragment>
    );
  }
}

export default CommentsList;
