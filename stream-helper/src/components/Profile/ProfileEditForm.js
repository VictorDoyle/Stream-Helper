import React, { useState, useEffect } from "react";
import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
/* styling */
import "../../styles/ProfileEditForm.css";
import { Button, Form } from "react-bootstrap";
/* GraphQl */
import { useMutation } from "@apollo/client";
import { UPDATEUSERPROFILE } from "../../graphql/operations";

function ProfileEditForm(props) {
  const [user, setUser] = useRecoilState(userState);
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [lgShow, setLgShow] = useState(props.lgShow);

  const [update, { loading, error, data }] = useMutation(UPDATEUSERPROFILE);

  useEffect(() => {
    if (!loading && data) {
      setUser(data);
      props.history.push("/home");
    }
  }, [loading, data]);

  if (loading) return console.log("Loading update");
  if (error) return `Error! ${error.message}`;

  const submitProfileEdit = async (e) => {
    e.preventDefault();
    await update({
      variables: {
        updateUserFirstname: firstname,
        updateUserLastname: lastname,
        updateUserUsername: username,
        updateUserEmail: email,
      },
    });
  };

  return (
    <>
      {user ? (
        <Form className="editProfileForm" onSubmit={submitProfileEdit}>
          <Form.Group controlId="formUpdateFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="firstName"
              placeholder="Update First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUpdateLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="lastName"
              placeholder="Update Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUpdateEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Update Your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUpdateUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Update Your Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUpdatePassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Update Password" />
            <br />
            <Form.Control
              type="confirmPassword"
              placeholder="Confirm Updated Password"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={() => setLgShow(false)}
          >
            Submit Changes
          </Button>
        </Form>
      ) : null}
    </>
  );
}

export default ProfileEditForm;
