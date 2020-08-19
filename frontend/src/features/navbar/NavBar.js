import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { toggleLoginModalState } from "../login/loginModalSlice"
import { clientLogout } from "../token/clientTokenSlice";
import { artistLogout } from "../token/artistTokenSlice";
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
  const history = useHistory()
  const dispatch = useDispatch();

  let routeExt = () => {
    if (client === null && artist !== null) {
      return (
        <li className="nav-item active">
        <NavLink
          exact
          to={`/artist/${currentUser.id}`}
          className="nav-link"
          >
          Profile
        </NavLink>
          </li>
        
      );
    } else if (client !== null && artist === null) {
      return (
       <li className="nav-item active">
        <NavLink
          exact
          to={`/client/${currentUser.id}`}
          className="nav-link"
          >
          Profile
        </NavLink>
          </li>
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
        <li className="nav-item active">
          {routeExt()}
        </li>
  
          <button className="logoutBttn justify-content-end" id="roadieLogout" onClick={userLogout}>
            Logout
          </button>
      
        </>
      );
    } else {
      return (
        <>
         <li className="nav-item active">
        <NavLink className="nav-link roadieLogIn" href="#" exact to="/" data-toggle="modal" data-target="#logInModalCenter" >Log In <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link roadieSignUp" href="#" exact to="/" data-toggle="modal" data-target="#exampleModalCenter">Sign Up <span className="sr-only">(current)</span></NavLink>
      </li>
        </>
      );
    }
  };

  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light roadieNav">
  <NavLink className="navbar-brand" href="#" exact to="/">Roadie</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">

    <ul className="navbar-nav ">
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle aboutTitle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          About
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">About Roadie</a>
          <a className="dropdown-item" href="#">Why Roadie</a>
          <a className="dropdown-item" href="#">Meet the Roadies</a>
        </div>
      </li>
       {displayButtons()}
    </ul>
  </div>
</nav>
  );
};

export default NavBar;
