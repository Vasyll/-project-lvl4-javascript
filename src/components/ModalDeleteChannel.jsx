import React from 'react';
import connect from '../connect';
import Modal from './Modal';

const mapStateToProps = ({ delChannelState, modalDeleteChannel }) => {
  const props = { delChannelState, modalDeleteChannel };
  return props;
};

@connect(mapStateToProps)
class ModalCreateChannel extends React.Component {
  deleteChannel = channelId => () => {
    const { deleteChannel } = this.props;
    return deleteChannel(channelId);
  }

  onCloseDelChannelModal = () => {
    const { closeDelChannelModal } = this.props;
    closeDelChannelModal();
  }

  render() {
    const { modalDeleteChannel, delChannelState } = this.props;
    const { channel, isOpen } = modalDeleteChannel;

    const disabled = delChannelState === 'requested';

    return (
      <Modal isOpen={isOpen}>
        <Modal.Header onCloseModal={this.onCloseDelChannelModal}>
          <Modal.Title>
            {`Are you sure you want to delete the channel "${channel.name}"`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={this.onCloseDelChannelModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.deleteChannel(channel.id)}
            disabled={disabled}
          >
            Delete
          </button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalCreateChannel;
