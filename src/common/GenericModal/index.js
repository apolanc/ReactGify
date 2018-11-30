import React from "react";
import { FaTrash } from "react-icons/fa";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default props => {
  const { component: Component, onHide, show, size, className, title } = props;

  return (
    <Modal isOpen={show} toggle={() => onHide()} size={size} backdrop>
      <ModalHeader>
        {title}
        <div className="modal-header-icon">
          <FaTrash />
        </div>
      </ModalHeader>
      <ModalBody className={className} style={className}>
        <Component {...props} />
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => onHide()}
        >
          Cancel
        </button>
        <button type="button" className="btn btn-primary">
          Ok
        </button>
      </ModalFooter>
    </Modal>
  );
};
