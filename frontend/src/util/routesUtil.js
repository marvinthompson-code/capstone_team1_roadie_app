import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { useSelector } from "react-redux"

export const AuthRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  // const user = useSelector((state) => state.userToken)
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !currentUser ? children : <Redirect to="/" />;
      }}
    />
  );
};

export const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  // const user = useSelector((state) => state.userToken)
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return currentUser ? children : <Redirect to="/login" />;
      }}
    />
  );
};
