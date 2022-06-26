import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import Modal from './Modal';

const mapStateToProps = ({ addChannelState, modalCreateChannel }) => {
  const props = { addChannelState, modalCreateChannel };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'newChannel' })
class ModalCreateChannel extends React.Component {
  componentDidUpdate() {
    this.createChannelInput.getRenderedComponent().focus();
  }

  addChannel = (channelName) => {
    const { addChannel, reset } = this.props;
    return addChannel(channelName, reset);
  }

  onCloseAddChannelModal = () => {
    const { closeAddChannelModal, reset } = this.props;
    reset();
    closeAddChannelModal();
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      modalCreateChannel,
    } = this.props;

    const { isOpen } = modalCreateChannel;

    return (
      <Modal isOpen={isOpen}>
        <Modal.Header onCloseModal={this.onCloseAddChannelModal}>
          <Modal.Title>Enter new channel name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(this.addChannel)}>
            <Field
              required
              name="name"
              component="input"
              type="text"
              className="form-control mb-3"
              id="channelName"
              ref={(input) => { this.createChannelInput = input; }}
              withRef
            />
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={this.onCloseAddChannelModal}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={pristine || submitting}
            >
              Save changes
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalCreateChannel;
