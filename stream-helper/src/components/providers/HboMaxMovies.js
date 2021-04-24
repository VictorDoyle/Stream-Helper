import React, { useState, useEffect } from "react";
/* gql */
import { useQuery } from "@apollo/client";
import {
  USERMOVIERECOMMENDATIONS,
  PROVIDERMOVIEQUERY,
  FILTEREDLENGTH,
} from "../../graphql/operations.js";
/* vendor imports */
import InfiniteRecommendations from "../Infinite/InfiniteRecommendations";

function HboMaxMovies({ providers }) {
  const [userMovieRecommendations, setUserMovieRecommendations] = useState();
  /* base states */
  const [take] = useState(10);
  const [cursor, setCursor] = useState(1);
  const [skip, setSkip] = useState(0);
  const [provideridprop, setProvideridprop] = useState(384);
  const [counter, setCounter] = useState(0);
  const [more, setMore] = useState(false);
  const { error, loading: loadingAll, data: dataAll, fetchMore } = useQuery(
    PROVIDERMOVIEQUERY,
    /* { fetchPolicy: "no-cache" }, */

    {
      fetchPolicy: "network-only",
      variables: {
        providerMovieQueryTake: take,
        providerMovieQuerySkip: skip,
        providerMovieQueryMyCursor: parseInt(cursor),
        providerMovieQueryProviderId: provideridprop,
      },
    },
  );

  const { error: errorMore, loading: loadingMore, data: dataMore } = useQuery(
    FILTEREDLENGTH,

    {
      variables: {
        filterLengthProviderId: 384,
      },
    },
  );

  useEffect(() => {
    if (dataAll) {
      const filteredMovies = dataAll.providerMovieQuery.filter(
        (number) => number.watchproviders[0].providerId === provideridprop,
      );
      setUserMovieRecommendations(filteredMovies);
    }
    console.log(userMovieRecommendations, "RECOMMENDATIONS");
    if (userMovieRecommendations) {
      setCursor(
        userMovieRecommendations[userMovieRecommendations.length - 1]
          .categoryId,
      );
      console.log(cursor, "CURSOR");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAll, dataAll]);

  console.log(JSON.stringify(error, null, 2), "PARSED JSON ERR");
  useEffect(() => {
    if (userMovieRecommendations && dataMore) {
      if (userMovieRecommendations.length < dataMore.filterLength) {
        setMore(true);
      } else {
        setMore(false);
      }
    }
  });

  const bigFetch = () => {
    fetchMore(
      {
        variables: {
          userMovieRecommendationsMyCursor: userMovieRecommendations.length,
        },
      },
      setCursor(
        userMovieRecommendations[userMovieRecommendations.length - 1]
          .categoryId,
      ),
      // setSkip(userMovieRecommendations[userMovieRecommendations.length - 1]),
    );
  };

  return (
    <>
      {userMovieRecommendations ? (
        <InfiniteRecommendations
          more={more}
          error={error}
          userMovieRecommendations={userMovieRecommendations}
          onLoadMore={bigFetch}
        />
      ) : (
        <h1> There are No Movies To Load </h1>
      )}{" "}
    </>
  );
}

export default HboMaxMovies;
