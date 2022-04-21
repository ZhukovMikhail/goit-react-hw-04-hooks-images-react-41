import { StyledOverlay, StyledModal } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ modalImage, alt, toggleModal }) => {
  const escapeEvent = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };
  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', escapeEvent);
    return () => {
      window.removeEventListener('keydown', escapeEvent);
    };
  });

  return createPortal(
    <StyledOverlay onClick={onBackdropClick}>
      <StyledModal>
        <img src={modalImage} alt={alt} />
      </StyledModal>
    </StyledOverlay>,
    modalRoot,
  );
};
Modal.propTypes = {
  modalImage: PropTypes.string,
  alt: PropTypes.string,
  toggleModal: PropTypes.func,
};
