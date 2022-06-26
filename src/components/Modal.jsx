import React from 'react';
import cn from 'classnames';

const Header = (props) => {
  const { children, onCloseModal } = props;

  return (
    <div className="modal-header">
      {children}
      <button onClick={onCloseModal} type="button" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

const Title = ({ children }) => <h5 className="modal-title">{children}</h5>;
const Body = ({ children }) => <div className="modal-body">{children}</div>;


export default class Modal extends React.Component {
  static Header = Header;

  static Title = Title;

  static Body = Body;

  render() {
    const {
      isOpen,
      children,
    } = this.props;

    const modalClass = cn({
      modal: true,
      fade: true,
      show: isOpen,
    });

    const modalStyle = {
      display: isOpen ? 'block' : 'none',
    };

    return (
      <React.Fragment>
        <div className={modalClass} tabIndex="-1" role="dialog" style={modalStyle}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              {children}
            </div>
          </div>
        </div>
        {isOpen && <div className="modal-backdrop fade show" />}
      </React.Fragment>
    );
  }
}
