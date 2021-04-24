import React, { useState, useEffect } from 'react'
import { Modal, Button, Container, Row } from 'react-bootstrap';
/* component imports */
import ProfileMovieCard from "../MovieCard/ProfileMovieCard";
/* GQL */
import { useQuery } from "@apollo/client";
import { DISLIKEDMOVIES } from "../../graphql/operations";


function DislikedMoviesModal() {
    const [lgShow, setLgShow] = useState(false);

    const [dislikedMovies, setDislikedMovies] = useState();
    const { loading, error, data } = useQuery(DISLIKEDMOVIES);

    useEffect(() => {
      if (!loading && data) {
        setDislikedMovies(data);
      }
    });
 
  
    const Mapper = () => (
      <>
 
        {dislikedMovies.dislikedMovies.map((movie, i) => (
            <ProfileMovieCard {...movie} key={i + 1} />
        ))}
     
 
 
      </>
    );
 
    return(
        <>
       <Button  onClick={() => setLgShow(true)}>Disliked Movies</Button>
     
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title color={"black"} id="example-modal-sizes-title-lg">
              Movies You've Disliked
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Container>
            <Row>

          {dislikedMovies ? <Mapper /> : <h1> error</h1> }
            </Row>
          </Container>

        </Modal.Body>
      </Modal>
        </>
    )
}

export default DislikedMoviesModal