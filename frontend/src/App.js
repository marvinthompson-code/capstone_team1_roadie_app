import React from "react";
import Modal from "react-modal";
import { Route } from "react-router-dom";
import NavBar from "./features/navbar/NavBar";
// import ClientSignUp from "./features/client/clientSignUp";
// import ArtistSignUpForm from "./features/Artist/ArtistSignUpForm";
import DisplaySignUp from "./features/Display/DisplaySignUp";
import EditClientProfileForm from "./features/ClientProfile/EditClientProfileForm";
import ClientProfile from './features/ClientProfile/ClientProfile';
import Login from "./features/login/Login";
import EventForm from "./features/Events/EventForm"
import SearchResults from "./features/SearchResults/SearchResults";
import Home from "./features/Home/Home";
import AuthProvider from "./providers/AuthContext";
import { AuthRoute, ProtectedRoute } from "./util/routesUtil";
import Portfolio from './features/Portfolio/Portfolio'
import ClientContactForm from "./features/ClientContactForm/ClientContactForm";
import UploadVideoModal from "./features/Portfolio/UploadVideoModal";
import UploadPictureModal from "./features/Portfolio/UploadPictureModal";

Modal.setAppElement('#root');


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Route exact path="/">
          <Home />
        </Route>
        <ProtectedRoute exact path="/users">
          Users
        </ProtectedRoute>
        <AuthRoute exact path="/signup">
          <DisplaySignUp />
        </AuthRoute>
        <AuthRoute exact path="/login">
          <Login />
        </AuthRoute>
      <Route exact path={"/results"}>
        <SearchResults />
      </Route>
      <Route exact path={"/client/:id"}>
        <ClientProfile />
        <ClientContactForm />
        <EditClientProfileForm />
        <EventForm />
      </Route>
      <Route exact path={"/artists/:id"}>
        <Portfolio />
        <UploadPictureModal />
        <UploadVideoModal />
      </Route>
      </AuthProvider>
    </div>
  );
}

export default App;
