const prefix = '/api/v1';

export default {
  messagesUrl: id => `${prefix}/channels/${id}/messages`,
  channelsUrl: () => `${prefix}/channels`,
  channelUrl: id => `${prefix}/channels/${id}`,
};
