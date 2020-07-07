import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./features/navbar/NavBar";
import ClientSignUp from "./features/client/clientSignUp"


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
        Sign Up component here
        <ClientSignUp />
      </Route>
      <Route exact path="/login">
        Log in component here
      </Route>
    </div>
  );
}

export default App;
