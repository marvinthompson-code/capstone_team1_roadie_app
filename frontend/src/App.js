import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import '../src/App.css'
import React, { useEffect } from "react";
import Modal from "react-modal";
import { Route } from "react-router-dom";
import NavBar from "./features/navbar/NavBar";
import firebase from "./firebase";
import { updateUser } from "./features/token/userTokenSlice";
import DisplaySignUp from "./features/Display/DisplaySignUp";
import Login from "./features/login/Login";
import NotificationDisplay from "./features/Notifications/NotificationDisplay"
import CreateEvent from "./features/Events/CreateEvent"
import PublicLandingPage from "./features/PublicLandingPage/PublicLandingPage"
import SearchResults from "./features/SearchResults/SearchResults";
import Home from "./features/Home/Home";
import AuthProvider from "./providers/AuthContext";
import { ProtectedRoute } from "./util/routesUtil";
import { useDispatch } from "react-redux";
import Artist from "./features/Profiles/Artist";
import Client from "./features/Profiles/Client";
import ArtistPhotoAlbum from "./features/Albums/ArtistPhotoAlbum";
import ClientPhotoAlbum from "./features/Albums/ClientPhotoAlbum"

import AboutRoadie from "./features/About/AboutRoadie";
import WhyRoadie from "./features/About/WhyRoadie";
import MeetTheRoadies from "./features/About/MeetRoadies";

Modal.setAppElement("#root");

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      dispatch(updateUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Route exact path="/">
          <Home />
          {/* <About /> */}
        </Route>
          <DisplaySignUp />
          <Login />
        <Route path="/about">
          <AboutRoadie />
        </Route>
        <Route path="/whyRoadie">
          <WhyRoadie />
        </Route>
        <Route path="/team">
          <MeetTheRoadies />
        </Route>
        <Route exact path={"/results"}>
          <SearchResults />
        </Route>

        <ProtectedRoute exact path={"/client/:id"}>
          <Client />
        </ProtectedRoute>
        
        <ProtectedRoute exact path={"/media/pictures/artist/:artist_id"}>
          <ArtistPhotoAlbum />
          {/* <ClientPhotoAlbum /> */}
        </ProtectedRoute>

        <ProtectedRoute exact path={"/artist/:id"}>
          <Artist />
        </ProtectedRoute>

        <Route exact path={"/notifications"}>
          <NotificationDisplay />
        </Route>

        <ProtectedRoute exact path={"/client/:id/createEvent"}>
          <CreateEvent />
        </ProtectedRoute>

        <Route path="/join">
          <PublicLandingPage />
        </Route>

      </AuthProvider>
    </div>
  );
}

export default App;
