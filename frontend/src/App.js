import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { Route } from "react-router-dom";
import NavBar from "./features/navbar/NavBar";
import firebase from "./firebase";
import { updateUser } from "./features/token/userTokenSlice";
import DisplaySignUp from "./features/Display/DisplaySignUp";
import EditClientProfileForm from "./features/ClientProfile/EditClientProfileForm";
import ClientProfile from "./features/ClientProfile/ClientProfile";
import Login from "./features/login/Login";
import EventForm from "./features/Events/EventForm";
import EventDisplay from "./features/Events/EventDisplay";
import CreateEvent from "./features/Events/CreateEvent"
import SearchResults from "./features/SearchResults/SearchResults";
import Home from "./features/Home/Home";
import AuthProvider from "./providers/AuthContext";
import { AuthRoute, ProtectedRoute } from "./util/routesUtil";
import ClientContactForm from "./features/ClientContactForm/ClientContactForm";
import { useSelector, useDispatch } from "react-redux";
import Artist from "./features/Profiles/Artist";
import Client from "./features/Profiles/Client";

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
          <Client />
        </ProtectedRoute>

        <ProtectedRoute exact path={"/artist/:id"}>
          <Artist />
        </ProtectedRoute>

        <ProtectedRoute exact path={"/client/:id/createEvent"}>
          <CreateEvent />
        </ProtectedRoute>

      </AuthProvider>
    </div>
  );
}

export default App;
