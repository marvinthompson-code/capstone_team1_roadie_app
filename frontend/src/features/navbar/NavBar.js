import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <NavLink exact to={"/"}>
        Home
      </NavLink>
      <NavLink to={"/users"}>All Users</NavLink>
      <NavLink to={"/login"}>Login</NavLink>
      <NavLink to={"/signup"}>Sign Up</NavLink>
    </nav>
  );
};

export default NavBar;
