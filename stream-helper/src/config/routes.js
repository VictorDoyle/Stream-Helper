import React from "react";
import { Switch, Route } from "react-router-dom";

/* page imports*/
import LandingPage from "../pages/LandingPage";
import Homepage from "../pages/Homepage";
import Movies from "../pages/Movies";
import Profile from "../pages/Profile";
import WatchedMovies from "../pages/WatchedMovies";
import SavedMovies from "../pages/SavedMovies";
import MovieDetail from "../pages/MovieDetail";
import NotFound from "../pages/NotFound";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/home" component={Homepage} />
    <Route path="/movies" component={Movies} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="/movie/:id" component={MovieDetail} />
    <Route path="/watched" component={WatchedMovies} />
    <Route path="/saved" component={SavedMovies} />
    <Route component={NotFound} />
  </Switch>
);
