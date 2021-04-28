import { XCircleFill } from "react-bootstrap-icons";
import "../../styles/MovieCard.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { USERUPDATE } from "../../graphql/operations";
import StarRatings from "react-star-ratings";
import ActionButtonsMain from "../ActionButtons/ActionButtonsMain";

toast.configure();

function MovieCard(props) {
  const [update, { loading, error }] = useMutation(USERUPDATE);

  const removeSaved = async () => {
    await update({
      variables: {
        addMovieToUserMovieId: props.id,
        addMovieToUserSaved: false,
      },
    });
  };

  const removeWatched = async () => {
    await update({
      variables: {
        addMovieToUserMovieId: props.id,
        addMovieToUserWatched: false,
      },
    });
  };

  return (
    <>
      <div className="movieCardMain" >
        <Link to={`/movie/${props.id}`}>
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${props.image}`}
            className="movieImageCard"
            alt="movie poster image"
          />
        </Link>
        <h3 className="movieCardTitle">
          <Link to={`/movie/${props.id}`}>{props.title}</Link>
        </h3>
        <p>{props.description}</p>
        {/* buttons */}
        {props.saved === true || props.liked === true || props.watched === true || props.disliked === true ? <> </> :
        <div className="movieButtonContainer">
        <ActionButtonsMain {...props} />
        </div>
        }
      
        <h4 className="starRatingsBox">
          {" "}
          {props.vote_average ? (
            <StarRatings
            
              rating={props.vote_average / 2}
              starRatedColor="yellow"
              starDimension="35px"
              starSpacing="5px"
              numberOfStars={5}
              name="rating"
            />
          ) : (
            <></>
          )}
        </h4>
        
          <div className="movieButtonContainer">
            {props.watched === true || props.saved === true ? (
              <>
                <div
                  className="removeMovieIcon"
                  onClick={() => {
                    removeWatched();
                    removeSaved();
                   
                    toast.warning(
                      "	🎥 Movie No Longer Marked as Watched or Saved",
                      {
                        className: "movieSaved",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      }
                    );
                  }}
                >
                  <XCircleFill color="rgb(54, 54, 54, 0.85)" size={32} />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        
      </div>
    </>
  );
}

export default MovieCard;
