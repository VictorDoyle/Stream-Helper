import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
/* styling */
import "../../styles/ProfileEditForm.css";

function EditUserModal({ firstname, lastname, email, username, submit }) {
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <Button style={{ margin: "25px" }} onClick={() => setLgShow(true)}>
        Edit Profile
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Your Profile &amp; Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="editProfileForm" onSubmit={submit}>
            <Form.Group controlId="formUpdateFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="Update First Name"
                onChange={firstname}
              />
            </Form.Group>

            <Form.Group controlId="formUpdateLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                placeholder="Update Last Name"
                onChange={lastname}
              />
            </Form.Group>

            <Form.Group controlId="formUpdateEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Update Your email"
                onChange={email}
              />
            </Form.Group>

            <Form.Group controlId="formUpdateUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Update Your Username"
                onChange={username}
              />
            </Form.Group>

         

            <Button variant="primary" type="submit">
              Submit Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditUserModal;
