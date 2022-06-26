import { createSelector } from 'reselect';

export const getChanneles = state => state.entities.channels;
export const channelsSelector = createSelector(
  getChanneles,
  channels => Object.values(channels),
);

export const getMessages = ({ result: { messages, currentChannelId } }) => (
  { messages, currentChannelId }
);
export const messagesSelector = createSelector(
  getMessages,
  ({ messages, currentChannelId }) => (
    messages.filter(message => message.channelId === currentChannelId)
  ),
);
