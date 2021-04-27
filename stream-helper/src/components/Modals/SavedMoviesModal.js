import React, { useState, useEffect} from 'react'
import { Modal, Button, Container, Row } from 'react-bootstrap';
/* component imports */
import ProfileMovieCard from "../MovieCard/ProfileMovieCard";
/* GQL */
import { useQuery } from "@apollo/client";
import { SAVEDMOVIES } from "../../graphql/operations";


function SavedMoviesModal() {
    const [lgShow, setLgShow] = useState(false);

    const [savedMovies, setSavedMovies] = useState();
    const { loading, error, data } = useQuery(SAVEDMOVIES);

    useEffect(() => {
      if (!loading && data) {
        setSavedMovies(data);
      }
      if (error) {
        return error
      }
    }, [loading, data]);

    
  
    const Mapper = () => (
      <>
        {savedMovies.savedMovies.map((movie, i) => (
            <ProfileMovieCard {...movie} key={i + 1} />
        ))}
      </>
    );
 
    return(
        <>
         <Button style={{ margin: "25px"}} onClick={() => setLgShow(true)}>Saved Movies</Button>
     
     <Modal
       size="lg"
       show={lgShow}
       onHide={() => setLgShow(false)}
       aria-labelledby="example-modal-sizes-title-lg"
     >
       <Modal.Header closeButton>
         <Modal.Title id="example-modal-sizes-title-lg">
           Movies You've Saved 
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
       <Container>
          <Row>

        {savedMovies ? <Mapper /> : <h1> error</h1> }
          </Row>
        </Container>

       </Modal.Body>
     </Modal>
        </>
    )
}

export default SavedMoviesModal