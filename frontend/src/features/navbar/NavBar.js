import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toggleModalState } from "../Artist/modalSlice";
import { toggleLoginModalState } from "../login/loginModalSlice"
import { clientLogout } from "../token/clientTokenSlice";
import { artistLogout } from "../token/artistTokenSlice";
import { recieveToken } from "../token/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
// import "../../css/NavBar.css";
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
          className="inactive"
        >
          Profile
        </NavLink>
      );
    } else if (client !== null && artist === null) {
      return (
        <NavLink
          exact
          to={`/client/${currentUser.id}`}
          activeClassName={"navItem"}
          className="inactive"
        >
          Profile
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
    console.log(currentUser, "currentUser")
    if (currentUser) {
      return (
        <>
          {routeExt()}
          <button className="logoutBttn" onClick={userLogout}>
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
         <li className="nav-item active">
        <NavLink className="nav-link" href="#" exact to="/login" onClick={() => dispatch(toggleLoginModalState())}>Log In <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" href="#" exact to="/signup" onClick={() => dispatch(toggleModalState())}>Sign Up <span className="sr-only">(current)</span></NavLink>
      </li>
        </>
      );
    }
  };

  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  {/* <NavLink className="navbar-brand" href="#" exact to="/"><img src={logo} alt="logo" className="navLogo" id="roadieLogo" /></NavLink> */}
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <NavLink className="nav-link" href="#" exact to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
       {displayButtons()}
      <li className="nav-item">
        <a className="nav-link" href="#">Pricing</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
  );
};

export default NavBar;
