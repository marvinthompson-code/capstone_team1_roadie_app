import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toggleModalState } from "../Artist/modalSlice";
import { clientLogout } from "../token/clientTokenSlice";
import { artistLogout } from "../token/artistTokenSlice";
import { useDispatch } from "react-redux";
import "../../css/NavBar.css";
import { logout } from "../../util/firebaseFunctions";
import { AuthContext } from "../../providers/AuthContext";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(clientLogout());
    dispatch(artistLogout());
    logout();
  };

  const displayButtons = () => {
    debugger;
    if (currentUser) {
      return (
        <>
          <button onClick={userLogout}>Logout</button>;
        </>
      );
    } else {
      return (
        <>
          <NavLink
            exact
            to={"/login"}
            onClick={() => dispatch(toggleModalState())}
          >
            Login
          </NavLink>
          <NavLink to={"/signup"} onClick={() => dispatch(toggleModalState())}>
            Sign Up
          </NavLink>
        </>
      );
    }
  };
  return (
    <nav>
      <NavLink exact to={"/"}>
        Home
      </NavLink>
      <NavLink to={"/users"}>All Users</NavLink>
      {displayButtons()}
    </nav>
  );
};

export default NavBar;
