import React from "react";
import Modal from "react-modal";
import Button from "./Button";

Modal.setAppElement("#root");

const customModal = ({ isOpen, onRequestClose, title, children, onSave }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="bg-gray-800 text-white rounded-lg p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
      <Button onClick={onSave} className="font-bold mt-4">
        Submit
      </Button>
    </Modal>
  );
};

export default customModal;
