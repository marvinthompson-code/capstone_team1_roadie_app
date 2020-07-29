import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toggleModalState } from "../Artist/modalSlice";
import { clientLogout } from "../token/clientTokenSlice";
import { artistLogout } from "../token/artistTokenSlice";
import { recieveToken } from "../token/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../css/NavBar.css";
import logo from "../../RoadieLogo.png";
import { logout } from "../../util/firebaseFunctions";
import { AuthContext } from "../../providers/AuthContext";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const user = useSelector((state) => state.userToken);
  const artist = useSelector((state) => state.artist);
  const client = useSelector((state) => state.client);
  const dispatch = useDispatch();

  let routeExt = () => {
    if (client === null && artist !== null) {
      return (
        <NavLink
          exact
          to={`/artist/${currentUser.id}`}
          activeClassName={"navItem"}
        >
          PROFILE
        </NavLink>
      );
    } else if (client !== null && artist === null) {
      return (
        <NavLink
          exact
          to={`/client/${currentUser.id}`}
          activeClassName={"navItem"}
        >
          PROFILE
        </NavLink>
      );
    }
  };

  const userLogout = () => {
    dispatch(clientLogout());
    dispatch(artistLogout());
    dispatch(recieveToken(null));
    logout();
  };
  const displayButtons = () => {
    if (currentUser) {
      return (
        <>
          {routeExt()}
          <button onClick={userLogout}>LOGOUT</button>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            className="inactive"
            activeClassName="active"
            exact
            to={"/login"}
            onClick={() => dispatch(toggleModalState())}
          >
            Login
          </NavLink>
          <NavLink
            className="inactive"
            activeClassName="active"
            id="signUpLink"
            to={"/signup"}
            onClick={() => dispatch(toggleModalState())}
          >
            Sign Up
          </NavLink>
        </>
      );
    }
  };
  return (
    <nav>
      <img src={logo} alt="logo" className="navLogo" />
      <NavLink className="inactive" activeClassName="active" exact to={"/"}>
        Home
      </NavLink>
      {displayButtons()}
    </nav>
  );
};

export default NavBar;
