import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { result: { currentChannelId }, sendMessageState } = state;
  const props = { currentChannelId, sendMessageState };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'newMessage' })
class MessageForm extends React.Component {
  sendMessage = (message) => {
    const {
      sendMessage,
      currentChannelId,
      reset,
      currentUser: { name },
    } = this.props;

    const messageData = {
      ...message,
      username: name,
    };
    return sendMessage(messageData, currentChannelId, reset);
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.sendMessage)}>
        <Field
          required
          name="message"
          component="textarea"
          className="form-control mb-3"
          rows="3"
          autoFocus
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={pristine || submitting}
        >
          Send message
        </button>
      </form>
    );
  }
}

export default MessageForm;
