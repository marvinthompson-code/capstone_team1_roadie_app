import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../../css/NavBar.css";
import { logout } from "../../util/firebaseFunctions";
import { AuthContext } from "../../providers/AuthContext";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const displayButtons = () => {
    if (currentUser) {
      return <button onClick={logout}>Logout</button>;
    } else {
      return (
        <>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/signup"}>Sign Up</NavLink>
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
