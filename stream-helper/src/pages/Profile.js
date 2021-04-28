import React, { useState, useEffect } from "react";
import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import CheckUser from "../hooks/checkUser";
import NavigationBar from "../components/Navbar/NavigationBar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
/* styling */
import {
  DropdownButton,
  Dropdown,
  ButtonGroup,
  Image,
  Card
} from "react-bootstrap";
import "../styles/Profile.css";
import SavedMoviesModal from "../components/Modals/SavedMoviesModal";
import EditUserModal from "../components/Modals/EditUserModal";
import WatchedMoviesModal from "../components/Modals/WatchedMoviesModal";
import DislikedMoviesModal from "../components/Modals/DislikedMoviesModal";
import imgLikedMovies from "../media/imgLikedMovies.png"
import imgSavedMovies from "../media/imgSavedMovies.png"
import imgEditProfile from "../media/imgEditProfile.png"



/* GraphQl */
import { useMutation } from "@apollo/client";
import { UPDATEUSERPROFILE } from "../graphql/operations";

function Profile({ history }) {
  const [update, { loading, error, data }] = useMutation(UPDATEUSERPROFILE);

  const [user, setUser] = useRecoilState(userState);
  /* EDIT PROFILE USER  */
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();

  const submitProfileEdit = async () => {
    console.log("submitProfileEdit");
    await update({
      variables: {
        updateUserFirstname: firstname,
        updateUserLastname: lastname,
        updateUserUsername: username,
        updateUserEmail: email,
      },
    });
  };
  /* Hero Banner */
  const heroText =
    "Edit Your Profile Details Or View Some Of Your Curated Lists Below";
  useEffect(() => {
    if (!loading && data) {
      setUser(data.updateUser);
    }
  }, [loading, data]);

  return (
    <>
      <NavigationBar />
      <CheckUser history={history} />

      <>
        {user && !loading ? (
          <>
            <HeroBanner
              heroText={heroText}
              heroTitle={`Hey ${user.username}`}
              history={history}
            />

            <div className="profileContentContainer">
              <div className="profileContentItems">
                

                {/* Modal For Liked Movies */}
                <Card style={{ width: '18rem' }} className="likedMoviesModal">
                  <Card.Img variant="top" src={imgLikedMovies} />
                  <Card.Body>
                      <DropdownButton
                        as={ButtonGroup}
                        title="Show Me!"
                        id="bg-nested-dropdown"
                        style={{paddingTop: '25px'}}
                      >
                        <Dropdown.Item eventKey="1">
                          <WatchedMoviesModal />
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                          <DislikedMoviesModal />
                        </Dropdown.Item>
                      </DropdownButton>
                  </Card.Body>
                </Card>

                {/* Modal For Saved Movies*/}

                <Card style={{ width: '18rem' }} className="savedMoviesModal">
                  <Card.Img variant="top" src={imgSavedMovies} />
                  <Card.Body>     
                  <SavedMoviesModal />
                  </Card.Body>
                </Card>
                

                {/* Modal For Profile Edit */}
                <Card style={{ width: '18rem' }} className="editUserModal">
                  <Card.Img variant="top" src={imgEditProfile} />
                  <Card.Body>  
                <EditUserModal
                  firstname={(e) => setFirstName(e.target.value)}
                  lastname={(e) => setLastName(e.target.value)}
                  email={(e) => setEmail(e.target.value)}
                  username={(e) => setUserName(e.target.value)}
                  submit={submitProfileEdit}
                />
                  </Card.Body>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    </>
  );
}

export default Profile;
