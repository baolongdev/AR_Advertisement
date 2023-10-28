import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function ConfirmationModal({ closeModal, onConfirm }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleConfirm = () => {
    setIsModalOpen(false);

    // Call the confirmation action if provided
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    // Optionally, you can perform other actions on modal close
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleModalClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={handleModalClose}>Close Modal</button>
      <button onClick={handleConfirm}>Confirm</button>
    </Modal>
  );
}
