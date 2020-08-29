import React from "react";
import Search from "./Search";
import { useSelector } from "react-redux";
import "../../css/Home.css";
import guitar from '../images/rhcp.jpg'
import performer from '../images/performer.jpg'
import concert from '../images/concertBlue.jpg'
import headshot from '../images/pexels-murat-esibatir-4355346.jpg'

const Home = () => {
  const loading = useSelector((state) => state.loading);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home container">
      <div className="jumbotron text-center roadieJumbo">
        <h1 className="display-4 jumbotronTitle">Roadie</h1>
        <p className="lead display-5">
          Search for Musicians to play at your next event, or search for a
          Booking Agent today!{" "}
        </p>
        <Search />
      </div>

      <div className="jumbotron text-center missionJumbo">
        <h1 className="display-4 jumbotronTitle">Book. Play. Connect.</h1>
        <p className="lead display-5">
          With Roadie, your next packed gig is only moments away.{" "}
        </p>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={guitar} alt="Guitar Player" className={"slideshowImage"}/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Artists</h5>
                <p>Connect with Booking Agents. Get gigs. Play shows. </p>
              </div>
            </div>

            <div className="carousel-item">
              <img src={headshot} alt="Woman with Afro" className={"slideshowImage"} />
              <div className="carousel-caption d-none d-md-block">
                <h5>Clients</h5>
                <p>
                  Seemless Event Creation. Find that next star for your stage.
                </p>
              </div>
            </div>

            <div className="carousel-item">
              <img src={concert} alt="Blue Concert Outdoor" className={"slideshowImage"}/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Grow</h5>
                <p>Customize profies. Promote events. Grow together.</p>
              </div>
            </div>
          </div>

          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
