import "../../styles/ProfileMovieCard.css";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
toast.configure();

function ProfileMovieCard(props) {



  return (
    <>
 

        <div className="profileMovieCard">
        <Link to={`/movie/${props.id}`}>
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${props.image}`}
            className="profileMovieCardImage"
            alt="movie card image in profile page"
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
