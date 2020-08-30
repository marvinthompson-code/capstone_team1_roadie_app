import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { clientLogout } from "../token/clientTokenSlice";
import { artistLogout } from "../token/artistTokenSlice";
import notificationBell from "../images/icons/notification.png";
import { recieveToken } from "../token/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../css/NavBar.css";
import { logout } from "../../util/firebaseFunctions";
import { AuthContext } from "../../providers/AuthContext";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const user = useSelector((state) => state.userToken);
  const artist = useSelector((state) => state.artist);
  const client = useSelector((state) => state.client);
  const history = useHistory();
  const dispatch = useDispatch();

  let routeExt = () => {
    if (client === null && artist !== null) {
      return (
        <>
          <li className="nav-item active">
            <NavLink
              exact
              to={`/artist/${currentUser.id}`}
              className="nav-link profileTab"
            >
              Profile
            </NavLink>
          </li>

          <li className="nav-item active">
            <img src={notificationBell} alt="notification" className="bell"/>
          </li>
        </>
      );
    } else if (client !== null && artist === null) {
      return (
        <>
          <li className="nav-item active">
            <NavLink
              exact
              to={`/client/${currentUser.id}`}
              className="nav-link profileTab"
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item active">
            <img src={notificationBell} alt="notification" className="bell"/>
          </li>
        </>
      );
    }
  };

  const userLogout = () => {
    dispatch(clientLogout());
    dispatch(artistLogout());
    dispatch(recieveToken(null));
    logout();
    history.push("/");
  };

  const displayButtons = () => {
    console.log(currentUser, "currentUser");
    if (currentUser) {
      return (
        <>
          {routeExt()}
          <li className="nav-item ">
            <NavLink
              className="nav-link logoutBttn"
              href="#"
              id="roadieLogout"
              onClick={userLogout}
              exact
              to="/"
            >
              Logout <span className="sr-only">(current)</span>
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item active">
            <NavLink
              className="nav-link roadieLogIn"
              href="#"
              exact
              to="*"
              data-toggle="modal"
              data-target="#logInModalCenter"
            >
              Log In <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              className="nav-link roadieSignUp"
              href="#"
              exact
              to="/"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Sign Up <span className="sr-only">(current)</span>
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light roadieNav sticky-top">
      <NavLink className="navbar-brand navTitle" href="#" exact to="/">
        <span id="roadieR">R</span>oadie
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav ">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle aboutTitle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              About
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <NavLink className="dropdown-item" exact to="/about">
                About Roadie
              </NavLink>
              <NavLink className="dropdown-item" exact to="/whyRoadie">
                Why Roadie
              </NavLink>
              <NavLink className="dropdown-item" exact to="/team">
                Meet the Roadies
              </NavLink>
            </div>
          </li>
          {displayButtons()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
