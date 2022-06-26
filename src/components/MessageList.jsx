import React from 'react';
import { messagesSelector } from '../selectors';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = { messages: messagesSelector(state) };
  return props;
};

@connect(mapStateToProps)
class MessageList extends React.Component {
  renderMessage = messages => (
    messages.map(message => (
      <p className="mb-2" key={message.id}>
        <strong className="mr-2">
          {`${message.username}:`}
        </strong>
        {message.message}
      </p>
    ))
  )

  render() {
    const { messages } = this.props;
    return (
      <div className="border rounded h-100 mb-3 p-3">
        {this.renderMessage(messages)}
      </div>
    );
  }
}

export default MessageList;
