import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { clientLogout } from "../token/clientTokenSlice";
import { artistLogout } from "../token/artistTokenSlice";
import notificationBell from "../images/icons/notification.png";
import { recieveToken } from "../token/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../Notifications/notificationsSlice"
import "../../css/NavBar.css";
import { logout, signUp } from "../../util/firebaseFunctions";
import { AuthContext } from "../../providers/AuthContext";
import { db } from "../../firebase";
import Login from "../login/Login"
import DisplaySignUp from "../Display/DisplaySignUp"

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const user = useSelector((state) => state.userToken);
  const artist = useSelector((state) => state.artist);
  const client = useSelector((state) => state.client);
  const history = useHistory();
  // const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  const loadNotifications = async (type) => {
    let notificationsArr = [];
    if (type === artist) {
      await db
        .collection("bookings")
        .doc(type.id)
        .collection("messages")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dispatch(addNotification({
              id: doc.id,
              data: doc.data(),
            }));
          });
        });
      
    } else if (type === client) {
      await db
        .collection("contactMessages")
        .doc(type.id)
        .collection("messages")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dispatch(addNotification({
              id: doc.id,
              data: doc.data(),
            }));
          });
        });
    }
  };

  let routeExt = () => {
    if (client === null && artist) {
       loadNotifications(artist);
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
          <li className="nav-item">
            {/* <div class="dropdown"> */}
              <button
                class="btn btn-secondary "
                type="button"
                id="dropdownMenuButton"
              >
                <img
                  src={notificationBell}
                  alt="notification"
                  className="bell"
                  onClick={() => history.push('/notifications')}
                />
              </button>
          </li>
        </>
      );
    } else if (client && artist === null) {
      loadNotifications(client);
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
          <li className="nav-item dropdown">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={notificationBell}
                  alt="notification"
                  className="bell"
                  onClick={() => history.push('/notifications')}
                />
              </button>
              {/* <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {notifications.map((notification) => {
                  let { name, message, body } = notification.data;
                  return (
                    <div class="dropdown-item" key={notification.id}>
                      <h4>{message}</h4>
                      <h3>{name}</h3>
                      <p>{body}</p>
                    </div>
                  );
                })}
              </div> */}
            </div>
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
