import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./features/navbar/NavBar";
import ArtistSignUpForm from "./features/Artist/ArtistSignUpForm"
// import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/">
        HOME
      </Route>
      <Route exact path="/users">
        Get all users List
      </Route>
      <Route exact path="/signup">
        <ArtistSignUpForm />
        Sign Up component here
      </Route>
      <Route exact path="/login">
        Log in component here
      </Route>
    </div>
  );
}

export default App;
