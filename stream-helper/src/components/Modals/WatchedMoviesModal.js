import React, { useState, useEffect } from 'react'
import { Modal, Button, Container, Row } from 'react-bootstrap';
/* component imports */
import ProfileMovieCard from "../MovieCard/ProfileMovieCard";
/* GQL */
import { useQuery } from "@apollo/client";
import { WATCHEDMOVIES } from "../../graphql/operations";

function WatchedMoviesModal() {
    const [lgShow, setLgShow] = useState(false);
    const [watchedMovies, setWatchedMovies] = useState();
    const { loading, error, data } = useQuery(WATCHEDMOVIES);
 
    useEffect(() => {
      if (!loading && data) {
        setWatchedMovies(data);
      }
    });
  
    const Mapper = () => (
      <>
 
        {watchedMovies.watchedMovies.map((movie, i) => (
            <ProfileMovieCard {...movie} key={i + 1} />
        ))}
     
 
 
      </>
    );
    return(
        <>
       <Button style={{ paddingRight: "5px"}} onClick={() => setLgShow(true)}>Watched Movies</Button>
     
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title color={"black"} id="example-modal-sizes-title-lg">
              Movies You've Watched
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <Container>
          <Row>

       {watchedMovies ? <Mapper /> : <h1> error</h1> } 
          </Row>
        </Container>



        </Modal.Body>
      </Modal>
        </>
    )
}

export default WatchedMoviesModal