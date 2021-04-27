import React, { useState, useEffect } from "react";
import "../styles/LandingPage.css";
/* vendor imports */
import { useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms";
import { SIGNUP, LOGIN } from "../graphql/operations";
import { toast } from "react-toastify";
import { Form, Button, Modal, Carousel } from "react-bootstrap";
import landingImageOne from '../media/landingImageOne.png';
import landingImageTwo from '../media/landingImageTwo.png';
import landingImageThree from '../media/landingImageThree.png';

function LandingPage({ history }) {
  const [user, setUser] = useRecoilState(userState);

  const [isNewUser, setIsNewUser] = useState(false);
  /* show info about App if true */
  const [knowMore, setKnowMore] = useState(false);
  const [formShow, setFormShow] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  /* learn more modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [
    login,
    { loading: loadingL, error: errorL, data: dataL },
  ] = useMutation(LOGIN);
  const [
    signup,
    { loading: loadingS, error: errorS, data: dataS },
  ] = useMutation(SIGNUP);

  useEffect(() => {
    if (!loadingL && dataL) {
      const { signinUser } = dataL;
      setUser(signinUser);
      history.push("/home");
    }
  }, [dataL]);

  useEffect(() => {
    if (!loadingS && dataS) {
    }
  }, [dataL]);

  const submitHandlerLogin = async (e) => {
    e.preventDefault();
    await login({
      variables: {
        signinUserEmail: email,
        signinUserPassword: password,
      },
    });
  };

  const submitHandlerSignup = async (e) => {
    e.preventDefault();
    await signup({
      variables: {
        signupUserSignupInput: {
          email: email,
          username: username,
          password: password,
        },
      },
    });
    toast.success("	User created", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setIsNewUser(false);
  };

  if (loadingS) return "Loading...";
  if (errorS) return `Error! ${errorS.message}`;
  if (loadingL) return "Loading...";
  if (errorL) return `Error! ${errorL.message}`;

  return (
    <>
      <div className="landingContentGrid" style={{ color: "black" }}>
        <div className="landingLeftCol">
          <div className="landingLeftText">
            <h1 className="landingTitle">
              {" "}
              A Movie Finder App To Save You Time
            </h1>
            <h3 className="landingSubTitle">
              {" "}
              We'll Recommend You Movies You'd Like <br /> Without Showing You
              Those You've already Seen
            </h3>
            <div className="landingButtonsContainer">
            <Button
              className="landingPageButton"
              onClick={() => {
                setIsNewUser(true);
                setFormShow(false);
              }}
            >
              {" "}
              Register{" "}
            </Button>
            <Button
              className="landingPageButton"
              onClick={() => {
                setIsNewUser(false);
                setFormShow(false);
              }}
            >
              {" "}
              Already A Member?{" "}
            </Button>
            <Button
              className="landingPageButton"
              onClick={() => {
                setShow(true)
                setFormShow(true);
              }}
            >
              {" "}
              Learn More{" "}
            </Button>
           

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>About Stream Helper</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Carousel>
                  <Carousel.Item className="carouselItemDetails">
                    <img
                      className="d-block w-100"
                      src={landingImageOne}
                      alt="First slide"
                      
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item className="carouselItemDetails"> 
                    <img
                      className="d-block w-100"
                      src={landingImageTwo}
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item className="carouselItemDetails">
                    <img
                      className="d-block w-100"
                      src={landingImageThree}
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>





                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Okay!
                  </Button>
                </Modal.Footer>
              </Modal>
    
            </div>
          </div>
        </div>
        <div className="landingRightCol">
          {isNewUser === false ? (
            /* if user clicks login -> */
            <div className="landingPageForm">
              <div className="formShowToggle" style={{ display: formShow }}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" onClick={submitHandlerLogin}>
                  {" "}
                  Login{" "}
                </Button>
              </div>
            </div>
          ) : (
            /* if user clicks register -> */
            <div className="landingPageForm">
              <div className="formShowToggle" style={{ display: formShow }}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" onClick={submitHandlerSignup}>
                  {" "}
                  Register{" "}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LandingPage;
