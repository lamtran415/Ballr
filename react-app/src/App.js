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
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
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
        </Switch>
      )}
    </>
  );
}

export default App;
