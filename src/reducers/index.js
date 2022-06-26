import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { omit } from 'lodash';
import * as actions from '../actions';

// MODALS

const modalCreateChannel = handleActions({
  [actions.openAddChannelModal]() {
    return { isOpen: true };
  },
  [actions.closeAddChannelModal]() {
    return { isOpen: false };
  },
}, { isOpen: false });

const modalDeleteChannel = handleActions({
  [actions.openDelChannelModal](state, { payload: channel }) {
    return { channel, isOpen: true };
  },
  [actions.closeDelChannelModal]() {
    return { channel: {}, isOpen: false };
  },
}, { channel: {}, isOpen: false });

const modalRenameChannel = handleActions({
  [actions.openRenameChannelModal](state, { payload: channel }) {
    return { channel, isOpen: true };
  },
  [actions.closeRenameChannelModal]() {
    return { channel: {}, isOpen: false };
  },
}, { channel: {}, isOpen: false });

// CHANNELS

const addChannelState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelSuccess]() {
    return 'successed';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
}, 'none');

const delChannelState = handleActions({
  [actions.delChannelRequest]() {
    return 'requested';
  },
  [actions.delChannelSuccess]() {
    return 'successed';
  },
  [actions.delChannelFailure]() {
    return 'failed';
  },
}, 'none');

const renameChannelState = handleActions({
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelSuccess]() {
    return 'successed';
  },
  [actions.renameChannelFailure]() {
    return 'failed';
  },
}, 'none');

const entities = handleActions({
  [actions.createChannel](state, { payload: newChannel }) {
    const { channels } = state;
    const updatedChannels = { ...channels, [newChannel.id]: newChannel };
    return { channels: updatedChannels };
  },
  [actions.removeChannel](state, { payload: id }) {
    const { channels } = state;
    return { channels: omit(channels, id) };
  },
  [actions.editChannel](state, { payload: updatedChannel }) {
    const { channels } = state;
    const updatedChannels = { ...channels, [updatedChannel.id]: updatedChannel };
    return { channels: updatedChannels };
  },
}, {});

// MESSAGES

const sendMessageState = handleActions({
  [actions.sendMessageRequest]() {
    return 'requested';
  },
  [actions.sendMessageSuccess]() {
    return 'failed';
  },
  [actions.sendMessageFailure]() {
    return 'successed';
  },
}, 'none');

const result = handleActions({
  [actions.addMessage](state, { payload }) {
    const { messages } = state;
    return {
      ...state,
      messages: [...messages, payload],
    };
  },
  [actions.setCurrentChannel](state, { payload: id }) {
    return {
      ...state,
      currentChannelId: id,
    };
  },
}, {
  messages: [],
  currentChannelId: 1,
});

export default combineReducers({
  sendMessageState,
  entities,
  result,
  addChannelState,
  delChannelState,
  renameChannelState,
  modalCreateChannel,
  modalDeleteChannel,
  modalRenameChannel,
  form: formReducer,
});
