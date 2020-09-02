import React from "react";
import "../../css/MeetRoadies.css";

const MeetTheRoadies = () => {
  return (
    <div className="container meetTheRoadies">
      <div className="jumbotron jumbotron-fluid meetTheRoadiesJumbo">
        <div class="container meetTheRoadiesHeader">
          <h1 className="display-4">
            Meet the <span id="WhyR">R</span>oadies!
          </h1>
          <p className="lead meetTheRoadiesPTag">
            We are the founding creators of Roadie! We came together on a solid
            commonality: our love for music! In that, we brainstormed some
            ideas... A team member, Marvin, led the way in adopting this
            prospect of building an alliance with musicians and agents to be
            able to lessen the gap between bookings gigs, event management, and
            actually being seen by the clients creating those events.{" "}
          </p>
        </div>
        <div className="meetTheRoadiesDiv">
          <div
            id="carouselExampleControls"
            className="meetTheRoadiesCar carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="..." alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="..." alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="..." alt="Third slide" />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTheRoadies;
