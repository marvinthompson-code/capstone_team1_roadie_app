import React from "react";
import Modal from "react-modal";
import { Route } from "react-router-dom";
import NavBar from "./features/navbar/NavBar";
import ClientSignUp from "./features/client/clientSignUp";
import ArtistSignUpForm from "./features/Artist/ArtistSignUpForm";
import Login from "./features/login/Login";
import AuthProvider from "./providers/AuthContext";
import { AuthRoute, ProtectedRoute } from "./util/routesUtil";

Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Route exact path="/">
          HOME
        </Route>
        <ProtectedRoute exact path="/users">
          Users
        </ProtectedRoute>
        <AuthRoute exact path="/signup">
          <ArtistSignUpForm />
          {/* <ClientSignUp /> */}
        </AuthRoute>
        <AuthRoute exact path="/login">
          <Login />

        </AuthRoute>
      </AuthProvider>
    </div>
  );
}

export default App;
