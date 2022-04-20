import { StyledOverlay, StyledModal } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  escapeEvent = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };
  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.escapeEvent);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.escapeEvent);
  }

  render() {
    return createPortal(
      <StyledOverlay onClick={this.onBackdropClick}>
        <StyledModal>
          <img src={this.props.modalImage} alt={this.props.alt} />
        </StyledModal>
      </StyledOverlay>,
      modalRoot,
    );
  }
}
