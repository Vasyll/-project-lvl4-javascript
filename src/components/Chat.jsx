import React from 'react';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import UserContext from '../context';

const Chat = () => (
  <UserContext.Consumer>
    {user => (
      <div className="row">
        <div className="col-3">
          <h5 className="mb-3">{user.currentUser.name}</h5>
          <ChannelList />
        </div>
        <div className="col-9">
          <MessageList />
          <MessageForm currentUser={user.currentUser} />
        </div>
      </div>
    )}
  </UserContext.Consumer>
);

export default Chat;
