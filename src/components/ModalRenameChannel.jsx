import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import Modal from './Modal';

const mapStateToProps = ({ renameChannelState, modalRenameChannel }) => {
  const props = { renameChannelState, modalRenameChannel };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'newChannelName' })
class ModalRenameChannel extends React.Component {
  componentDidUpdate() {
    this.renameChannelInput.getRenderedComponent().focus();
  }

  renameChannel = channelId => (channelName) => {
    const { renameChannel, reset } = this.props;
    return renameChannel(channelName, channelId, reset);
  }

  onCloseRenameChannelModal = () => {
    const { closeRenameChannelModal, reset } = this.props;
    reset();
    closeRenameChannelModal();
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      modalRenameChannel,
    } = this.props;

    const { channel, isOpen } = modalRenameChannel;

    return (
      <Modal isOpen={isOpen}>
        <Modal.Header onCloseModal={this.onCloseRenameChannelModal}>
          <Modal.Title>
            {`Enter a new name for the channel "${channel.name}"`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(this.renameChannel(channel.id))}>
            <Field
              required
              name="name"
              component="input"
              type="text"
              className="form-control mb-3"
              placeholder="Enter new name here"
              id="newChannelName"
              ref={(input) => { this.renameChannelInput = input; }}
              withRef
            />
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={this.onCloseRenameChannelModal}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={pristine || submitting}
            >
              Save name
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalRenameChannel;
