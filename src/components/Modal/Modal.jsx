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
    // console.log('addEventListener');
    window.addEventListener('keydown', escapeEvent);
    return () => {
      // console.log('removeEventListener');
      window.removeEventListener('keydown', escapeEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  toggleModal: PropTypes.bool,
};
