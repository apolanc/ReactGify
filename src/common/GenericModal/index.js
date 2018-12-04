import React from "react";
import { Modal, ModalBody } from "reactstrap";

export default props => {
  const { component: Component, onHide, show, size, className } = props;

  return (
    <Modal isOpen={show} toggle={() => onHide()} size={size} backdrop>
      <ModalBody className={className} style={className}>
        <Component {...props} />
      </ModalBody>
    </Modal>
  );
};
