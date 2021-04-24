import React, { useState } from "react";
import { ToggleButton, Button, ToggleButtonGroup } from "react-bootstrap";
import {
  Bookmark,
  HandThumbsUp,
  HandThumbsDown,
  Check2,
} from "react-bootstrap-icons";
import "../../styles/ActionButtons.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import { USERUPDATE } from "../../graphql/operations";
import Toasty from "../Toaster/toast";
import { ToastContainer, toast } from "react-toastify";

function ActionButtons(props) {
  const [update, { loading, error }] = useMutation(USERUPDATE);

  const submitLike = async (e) => {
    e.preventDefault();
    await update({
      variables: {
        addMovieToUserMovieId: props.currentMovieDetails.movie.id,
        addMovieToUserLiked: true,
      },
    });
  };

  const submitDislike = async (e) => {
    e.preventDefault();
    await update({
      variables: {
        addMovieToUserMovieId: props.currentMovieDetails.movie.id,
        addMovieToUserDisliked: true,
      },
    });
  };

  const submitSave = async () => {
    await update({
      variables: {
        addMovieToUserMovieId: props.currentMovieDetails.movie.id,
        addMovieToUserSaved: true,
      },
    });
  };

  const removeSaved = async () => {
    await update({
      variables: {
        addMovieToUserMovieId: props.currentMovieDetails.movie.id,
        addMovieToUserSaved: false,
      },
    });
  };

  const removeWatched = async () => {
    await update({
      variables: {
        addMovieToUserMovieId: props.currentMovieDetails.movie.id,
        addMovieToUserWatched: false,
      },
    });
  };

  const submitWatched = async (e) => {
    e.preventDefault();
    await update({
      variables: {
        addMovieToUserMovieId: props.currentMovieDetails.movie.id,
        addMovieToUserWatched: true,
      },
    });
  };

  return (
    <>
      <div className="actionButtonContainer">
        <Button
          className="actionButtonBox"
          onClick={() => {
            submitSave();

            console.log("clicked save");
            toast.warning("🎥 Movie Saved!", {
              className: "movieSaved",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }}
        >
          {" "}
          <Bookmark
            color={"white"}
            size={25}
            className="movieDetailHeartIcon"
          />{" "}
          Save
        </Button>
        <Button
          className="actionButtonBox"
          onClick={(e) => {
            submitWatched(e);

            console.log("clicked watched");
            toast.warning("	👍 Added to Watched", {
              className: "movieSaved",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }}
        >
          {" "}
          <Check2
            color={"white"}
            size={25}
            className="movieDetailHeartIcon"
          />{" "}
          Watched
        </Button>
        <Button
          className="actionButtonBox"
          onClick={(e) => {
            submitLike(e);
            console.log("clicked like");
            toast.warning("	👍 Liked Movie", {
              className: "movieSaved",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }}
        >
          {" "}
          <HandThumbsUp
            color={"white"}
            size={25}
            className="movieDetailHeartIcon"
          />{" "}
          Like
        </Button>
        <Button
          className="actionButtonBox"
          onClick={(e) => {
            submitDislike(e);
            console.log("clicked discard");
            toast.warning("	👎 Disliked Movie", {
              className: "movieSaved",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }}
        >
          {" "}
          <HandThumbsDown
            color={"white"}
            size={25}
            className="movieDetailHeartIcon"
          />{" "}
          Dislike
        </Button>
      </div>
    </>
  );
}

export default ActionButtons;
