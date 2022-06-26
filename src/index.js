import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import socket from './socket';
import app from './app';
import {
  createChannel,
  removeChannel,
  editChannel,
  addMessage,
} from './actions';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

faker.locale = 'ru';

const currentUserName = cookies.get('username');
const userName = currentUserName || faker.name.findName();

if (!currentUserName) {
  cookies.set('username', userName);
}

const user = {
  currentUser: {
    name: userName,
  },
};

const store = app(gon, user);

socket.on('newChannel', (channel) => {
  store.dispatch(createChannel(channel.data.attributes));
});

socket.on('removeChannel', (channel) => {
  store.dispatch(removeChannel(channel.data.id));
});

socket.on('renameChannel', (channel) => {
  store.dispatch(editChannel(channel.data.attributes));
});

socket.on('newMessage', (message) => {
  store.dispatch(addMessage(message.data.attributes));
});
