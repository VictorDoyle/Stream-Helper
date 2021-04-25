import React, { useState, useEffect } from "react";
import NavigationBar from "../components/Navbar/NavigationBar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
/* styling */
// import { EyeSlash, HandThumbsDown, HeartFill } from "react-bootstrap-icons";
import "../styles/Homepage.css";
/* vendor imports */
import { useQuery } from "@apollo/client";
import Infinite from "../components/Infinite/Infinite";
// import CheckUser from "../hooks/checkUser";

/* gql */
import { ALLMOVIES } from "../graphql/operations";
/* userState via recoil */
// import { userState } from "../recoil/atoms";
// import { useRecoilState } from "recoil";

function Homepage({ history }) {
  /* user state */
  // const [user] = useRecoilState(userState);

  // console.log(user, "Current user");
  const heroTitle = "Welcome To StreamHelper";
  const heroText =
    "Your Homepage Will Always Display Movies You've Seen In Case You Want To Rewatch Them";

  /* base states */
  const [allMovies, setAllMovies] = useState([]);
  const [take] = useState(10);
  const [cursor, setCursor] = useState(1);
  const [skip, setSkip] = useState(0);

  const { loading: loadingAll, data: dataAll, fetchMore } = useQuery(
    ALLMOVIES,
    {
      variables: {
        allMoviesTake: take,
        allMoviesSkip: skip,
        allMoviesMyCursor: cursor,
      },
    },
  );

  useEffect(() => {
    if (!loadingAll && dataAll) {
      setAllMovies(dataAll.allMovies);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAll, dataAll]);

  const bigFetch = () => {
    fetchMore(
      {
        variables: {
          allMoviesMyCursor: allMovies.length - 1,
        },
      },
      setCursor(allMovies[allMovies.length - 1].categoryId),
      setSkip(2),
    );
  };
  return (
    <>
      <NavigationBar />
      <HeroBanner heroText={heroText} heroTitle={heroTitle} history={history} />
      <div className="homepageTutorial">
        <h3>
          {" "}
          Gone Are The Days Of Looking For Your Next Movie. <br />
          With Constant New Movie Recommendations Made Just For You, <br />
          You'll Always Have Something To Play Next{" "}
        </h3>
      </div>

      {allMovies.length > 0 ? (
        <Infinite allMovies={allMovies} onLoadMore={bigFetch} />
      ) : (
        <h1> There are No Movies To Load </h1>
      )}
    </>
  );
}

export default Homepage;
