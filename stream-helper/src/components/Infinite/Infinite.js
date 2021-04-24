import React, { useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../styles/MovieCard.css";

const Infinite = ({ allMovies, onLoadMore }) => {
  const Mapper = () => (
    <div className="movieCardContainer">
      {allMovies.map((movie, i) => (
        <MovieCard {...movie} key={i + 1} />
      ))}
    </div>
  );
  //
  return (
    <>
      {allMovies ? (
        <InfiniteScroll
          dataLength={allMovies.length}
          hasMore={true}
          next={onLoadMore}
          className="scroll"
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>End of list</b>
            </p>
          }
        >
          <Mapper />
        </InfiniteScroll>
      ) : (
        <></>
      )}
      <h2>Load More</h2>
    </>
  );
};

export default Infinite;
