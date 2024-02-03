import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllPhotos from "./components/Photos/AllPhotos";
import IndividualPhoto from "./components/Photos/IndividualPhoto";
import CreatePhoto from "./components/Photos/CreatePhoto";
import SplashPage from "./components/SplashPage";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer/Footer";
import UserPhotos from "./components/Photos/UserPhotos";
import UserAlbums from "./components/Albums/UserAlbums";
import IndividualAlbum from "./components/Albums/IndividualAlbum";
import IndividualTag from "./components/Tags/IndividualTag";
import SearchPage from "./components/SearchPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = "/">
            <SplashPage />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/photos">
            <AllPhotos />
          </Route>
          <Route exact path="/photos/upload">
            <CreatePhoto />
          </Route>
          <Route exact path="/photos/:photoId">
            <IndividualPhoto />
          </Route>
          <Route exact path ="/photos/users/:userId">
            <UserPhotos />
          </Route>
          <Route exact path="/photos/users/:userId/albums">
            <UserAlbums />
          </Route>
          <Route exact path="/photos/users/:userId/albums/:albumId">
            <IndividualAlbum />
          </Route>
          <Route exact path ="/tags/:tagId">
            <IndividualTag />
          </Route>
          <Route exact path="/search/:q">
            <SearchPage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
