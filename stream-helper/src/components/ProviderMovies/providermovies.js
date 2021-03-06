import React, { useState, useEffect } from "react";

/* gql */
import { useQuery } from "@apollo/client";
import {
  PROVIDERMOVIEQUERY,
} from "../../graphql/operations.js";
/* vendor imports */
import InfiniteRecommendations from "../Infinite/InfiniteRecommendations";

const ProviderMovies = ({ providerprop }) => {
  const [userMovieRecommendations, setUserMovieRecommendations] = useState();
  /* base states */
  const [take] = useState(10);
  const [cursor, setCursor] = useState(1);
  const [skip, setSkip] = useState(0);
  const [provideridprop, setProvideridprop] = useState(providerprop);
  const { error, loading: loadingAll, data: dataAll, fetchMore } = useQuery(
    PROVIDERMOVIEQUERY,

    {
      variables: {
        providerMovieQueryTake: take,
        providerMovieQuerySkip: skip,
        providerMovieQueryMyCursor: cursor,
        providerMovieQueryProviderId: provideridprop,
      },
    }
  );

  useEffect(() => {
    console.log("USE EFFECT BUT NO LOGIC HIT");
    if (dataAll) {
      setUserMovieRecommendations(dataAll.providerMovieQuery);
      console.log(providerprop, "USE EFFECT IN CHILD HIT");
    }
    if (userMovieRecommendations) {
      setCursor(
        userMovieRecommendations[userMovieRecommendations.length - 1].categoryId
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAll, dataAll, providerprop]);


  const bigFetch = () => {
    fetchMore(
      {
        variables: {
          userMovieRecommendationsMyCursor: userMovieRecommendations.length,
        },
      },
      setCursor(
        userMovieRecommendations[userMovieRecommendations.length - 1].categoryId
      )
      // setSkip(userMovieRecommendations[userMovieRecommendations.length - 1]),
    );
  };
  return (
    <>
      {userMovieRecommendations ? (
        <InfiniteRecommendations
          error={error}
          userMovieRecommendations={userMovieRecommendations}
          onLoadMore={bigFetch}
        />
      ) : (
        <h1> There are No Movies To Load </h1>
      )}{" "}
    </>
  );
};

export default ProviderMovies;
