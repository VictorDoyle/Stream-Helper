import "../../styles/ProfileMovieCard.css";
import { XCircleFill } from "react-bootstrap-icons";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { USERUPDATE } from "../../graphql/operations";
import { Link } from "react-router-dom";
toast.configure();

function ProfileMovieCard(props) {
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
       
        <div
                  className="removeMovieProfileIcon"
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
        </div>


 
    

    </>
  );
}

export default ProfileMovieCard;
