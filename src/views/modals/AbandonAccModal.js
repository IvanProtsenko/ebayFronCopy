import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { apiService } from '../../services/ApiService';

export default function AbandonAccountModal(props) {
  const [statusDescription = '', setStatusDescription] = useState();

  const handleInputStatusDescription = (event) => {
    setStatusDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accsEmails = props.rows.map((row) => row.email);
    await apiService.updateAccountsStatus(accsEmails, statusDescription);

    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Отказать аккаунтам
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              value={statusDescription}
              onChange={handleInputStatusDescription}
              placeholder="Enter cause"
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button className="modalButton" variant="primary" type="submit">
              Отказать
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
