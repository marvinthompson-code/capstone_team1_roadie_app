import React from "react";
import { useSelector } from "react-redux";
import guitarist from "../images/pexels-harrison-haines-3536256.jpg";
import brownGuitar from "../images/pexels-markus-spiske-92080.jpg";
import { NavLink } from "react-router-dom";
import DisplaySignUp from "../Display/DisplaySignUp";
import "../../css/PublicLandingPage.css";

const PublicLandingPage = () => {
  return (
    <div className="landingPage container">
      <div className="jumbotron text-center roadieJumbo">
        <div className="container landingPageHeader">
          <h1 className="display-4 jumbotronTitle">Book. Play. Connect.</h1>
          <p className="lead display-5">
            Become a Roadie today! Sign up and be one step closer towards your
            next packed show.
          </p>
        </div>

        <div className="container landingPageBody">
          <div className="container firstBody">
            <div className="row">
              <div className="col leftPec">
                <img
                  id="imgOne"
                  src={brownGuitar}
                  className="rounded float-left img-fluid max-width: 100%"
                />
              </div>
              <div className="col">
                <div className="jumbotron-fluid max-width: 100% text-center leftTwoPec">
                  <h5 className="lead display-4 ">For Artists</h5>
                  <p className="lead display-5">
                    <span className="badge badge-success">R</span>
                    Create and Customize a Profile and promote upcoming shows.
                  </p>
                  <p className="lead display-5">
                    <span className="badge badge-success">R</span>
                    Get in touch with Clients and book your next gig today.
                  </p>
                  <p className="lead display-5">
                    <span className="badge badge-success">R</span>Become a Roadie
                    Today.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="container secondBody">
            <div className="row">
              <div className="col rightPec">
                <div className="jumbotron-fluid max-width: 100% text-center float-left">
                  <h5 className="lead-fluid display-4 ">For Clients</h5>
                  <p className="lead display-5">
                    <span className="badge badge-success">R</span>
                    Seamless Event creation. Search for venues, set show
                    details, and make your night unforgettable.
                  </p>
                  <p className="lead display-5">
                    <span className="badge badge-success">R</span>
                    Search for Artists, Book them and add them to your show.
                  </p>
                  <p className="lead display-5">
                    <span className="badge badge-success">R</span>Become a Roadie
                    Today.
                  </p>
                </div>
              </div>
              <div className="col">
                <img
                  id="imgTwo"
                  src={guitarist}
                  className="rounded float-right img-fluid max-width: 100%"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="jumbotron-fluid text-center">
          <h1 className="display-4 jumbotronTitle"> Become a Roadie Today</h1>
        </div>

        <div className="col signUpLandingBtn">
          <div className="signUpLandingBtnDiv">
            <NavLink
              className="nav-link roadieSignUpTwo"
              href="#"
              exact
              to="/"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Sign Up <span className="sr-only">(current)</span>
            </NavLink>
          </div>
        </div>
      </div>
      <DisplaySignUp />
    </div>
  );
};

export default PublicLandingPage;
