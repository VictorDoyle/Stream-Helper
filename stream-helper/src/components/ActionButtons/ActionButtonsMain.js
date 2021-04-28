import React, { useEffect, useState } from "react";
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

function ActionButtonsMain(props) {
  const [update, { loading, error }] = useMutation(USERUPDATE);

  
  const submitLike = async (e) => {
    e.preventDefault();
    await update({
      variables: {
        addMovieToUserMovieId: props.id,
        addMovieToUserLiked: true,
      },
    });
  };

  const submitDislike = async (e) => {
    e.preventDefault();
    await update({
      variables: {
        addMovieToUserMovieId: props.id,
        addMovieToUserDisliked: true,
      },
    });
  };

  const submitSave = async () => {
    await update({
      variables: {
        addMovieToUserMovieId: props.id,
        addMovieToUserSaved: true,
      },
    });
  };

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

  const submitWatched = async (e) => {
    e.preventDefault();
    await update({
      variables: {
        addMovieToUserMovieId: props.id,
        addMovieToUserWatched: true,
      },
    });
  };


  return (
    <>
    
    <div className="mainActionButtons">
    <Button
      className="mainActionBox"
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
        size={15}
        className="movieDetailHeartIcon"
      />{" "}
      Save
    </Button>
    <Button
      className="mainActionBox"
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
        size={15}
        className="movieDetailHeartIcon"
      />{" "}
      Watched
    </Button>
    <Button
      className="mainActionBox"
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
        size={15}
        className="movieDetailHeartIcon"
      />{" "}
      Like
    </Button>
    <Button
      className="mainActionBox"
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
        size={15}
        className="movieDetailHeartIcon"
      />{" "}
      Dislike
    </Button>
  </div>
  
      
    </>
  );
}

export default ActionButtonsMain;
