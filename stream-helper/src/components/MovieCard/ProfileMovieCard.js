
import "../../styles/ProfileMovieCard.css";
import Toasty from "../Toaster/toast";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, gql } from "@apollo/client";
import { USERUPDATE } from "../../graphql/operations";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';
toast.configure();

function ProfileMovieCard(props) {



  return (
    <>
 

        <div className="profileMovieCard">
        <Link to={`/movie/${props.id}`}>
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${props.image}`}
            className="profileMovieCardImage"
          />
        </Link>
        <h3 className="profileMovieCardTitle">
          <Link to={`/movie/${props.id}`}>{props.title}</Link>
        </h3>
        <p>{props.description}</p>
        <h5>{props.vote_average}</h5>
        <h5>Genre</h5>  
        </div>


 
    

    </>
  );
}

export default ProfileMovieCard;
