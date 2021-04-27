import React, { useEffect, useState } from "react";
import NavigationBar from "../components/Navbar/NavigationBar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import MovieCard from "../components/MovieCard/MovieCard";
import CheckUser from "../hooks/checkUser";
import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { SAVEDMOVIES } from "../graphql/operations";

function SavedMovies({ history }) {
  const heroTitle = "Your Saved Movies";
  const heroText = "You'll Find All Your Hearted Movies Here.";
  const [user] = useRecoilState(userState);
  const [savedMovies, setSavedMovies] = useState();
  const { loading, error, data } = useQuery(SAVEDMOVIES, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading && data) {
      setSavedMovies(data);
    }
  }, [loading, data]);

  const Mapper = () => (
    <>
    
      {savedMovies.savedMovies.map((movie, i) => (
        <MovieCard {...movie} key={i + 1} />
      ))}
    </>
  );

  return (
    <>
      <NavigationBar />
      <CheckUser history={history} />
      <HeroBanner heroText={heroText} heroTitle={heroTitle}  history = {history}/>
      {user ? (
        <div className="movieCardContainer">
          {error ? <h1>{error}</h1> : null}
          {savedMovies ? <Mapper /> : <h1> error</h1>}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SavedMovies;
