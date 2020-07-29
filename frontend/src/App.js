import React, { useEffect } from "react";
import Modal from "react-modal";
import { Route } from "react-router-dom";
import NavBar from "./features/navbar/NavBar";
import firebase from "./firebase";
import ArtistProfile from "./features/Artist/ArtistProfile"
import { updateUser } from "./features/token/userTokenSlice";
// import ClientSignUp from "./features/client/clientSignUp";
// import ArtistSignUpForm from "./features/Artist/ArtistSignUpForm";
import DisplaySignUp from "./features/Display/DisplaySignUp";
import BookMeForm from "./features/Artist/BookMeForm";
import EditClientProfileForm from "./features/ClientProfile/EditClientProfileForm";
import ClientProfile from "./features/ClientProfile/ClientProfile";
import Login from "./features/login/Login";
import EventForm from "./features/Events/EventForm";
import EventDisplay from "./features/Events/EventDisplay";
import SearchResults from "./features/SearchResults/SearchResults";
import Home from "./features/Home/Home";
import AuthProvider from "./providers/AuthContext";
import { AuthRoute, ProtectedRoute } from "./util/routesUtil";
import Portfolio from "./features/Portfolio/Portfolio";
import ClientContactForm from "./features/ClientContactForm/ClientContactForm";
import UploadVideoModal from "./features/Portfolio/UploadVideoModal";
import UploadPictureModal from "./features/Portfolio/UploadPictureModal";
import { useSelector, useDispatch } from "react-redux";

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
        </Route>
        <AuthRoute exact path="/signup">
          <DisplaySignUp />
        </AuthRoute>
        <AuthRoute exact path="/login">
          <Login />
        </AuthRoute>

        <Route exact path={"/results"}>
          <SearchResults />
        </Route>

        <ProtectedRoute exact path={"/client/:id"}>
          <ClientProfile />
          <ClientContactForm />
          <EditClientProfileForm />
          <EventForm />
        </ProtectedRoute>

        <ProtectedRoute exact path={"/artist/:id"}>
          <ArtistProfile />
          <Portfolio />
          <UploadPictureModal />
          <UploadVideoModal />
          <BookMeForm />
        </ProtectedRoute>
      </AuthProvider>
    </div>
  );
}

export default App;
