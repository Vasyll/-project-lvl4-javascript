import React from 'react';
import cn from 'classnames';
import connect from '../connect';
import { channelsSelector } from '../selectors';
import ModalCreateChannel from './ModalCreateChannel';
import ModalDeleteChannel from './ModalDeleteChannel';
import ModalRenameChannel from './ModalRenameChannel';

const mapStateToProps = (state) => {
  const { result: { currentChannelId } } = state;
  const props = {
    channels: channelsSelector(state),
    currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelList extends React.Component {
  onOpenAddChannelModal = () => {
    const { openAddChannelModal } = this.props;
    openAddChannelModal();
  }

  onOpenDelChannelModal = channel => () => {
    const { openDelChannelModal } = this.props;
    openDelChannelModal(channel);
  }

  onOpenRenameChannelModal = channel => () => {
    const { openRenameChannelModal } = this.props;
    openRenameChannelModal(channel);
  }

  onSwitchActiveChannel = id => () => {
    const { setCurrentChannel } = this.props;
    setCurrentChannel(id);
  }

  renderControls = channel => (
    <React.Fragment>
      <button
        onClick={this.onOpenDelChannelModal(channel)}
        type="button"
        className="close ml-auto"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <button
        onClick={this.onOpenRenameChannelModal(channel)}
        type="button"
        className="btn btn-link btn-rename"
      >
        rename
      </button>
    </React.Fragment>
  );

  getListItemClass = (channelId) => {
    const { currentChannelId } = this.props;

    return cn({
      btn: true,
      'btn-link': true,
      'nav-link': true,
      'font-weight-bold': currentChannelId === channelId,
      'font-weight-light': currentChannelId !== channelId,
    });
  }

  renderСhannels = () => {
    const { channels } = this.props;
    // console.log(channels);

    return channels.map(({ name, id, removable }) => (
      <li key={id} className="nav-item d-flex align-items-center">
        <button
          onClick={this.onSwitchActiveChannel(id)}
          className={this.getListItemClass(id)}
          type="button"
        >
          {name}
        </button>
        {removable && this.renderControls({ name, id })}
      </li>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <ul className="nav flex-column mb-3">
          {this.renderСhannels()}
        </ul>
        <button
          type="button"
          className="btn btn-outline-success btn-block"
          onClick={this.onOpenAddChannelModal}
        >
          Add channel
        </button>
        <ModalCreateChannel />
        <ModalDeleteChannel />
        <ModalRenameChannel />
      </React.Fragment>
    );
  }
}

export default ChannelList;
