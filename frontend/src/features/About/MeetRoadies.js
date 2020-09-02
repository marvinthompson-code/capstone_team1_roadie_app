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
        <div className="container meetTheRoadiesDiv">
          {/* Marvin */}
          <div className="container roadieMembers">
            <div className="row">
              <div className="col leftMembers">
                <h3>Marvin Thombson</h3>
              </div>
              <div className="col">
                <p>images of Marvin</p>
              </div>
            </div>
          </div>
          {/* Ashya */}
          <div className="container roadieMembers">
            <div className="row">
              <div className="col leftMembers">
                <p>images of Marvin</p>
              </div>
              <div className="col">
                <h3>Ashya Manning</h3>
              </div>
            </div>
          </div>

          {/* Henry */}
          <div className="container roadieMembers">
            <div className="row">
              <div className="col leftMembers">
                <h3>Henry Nuñez</h3>
              </div>
              <div className="col">
                <p>images of Marvin</p>
              </div>
            </div>
          </div>
          {/* Kevin */}
          <div className="container roadieMembers">
            <div className="row">
              <div className="col leftMembers">
                <p>images of Marvin</p>
              </div>
              <div className="col">
                <h3>Kevin Wong</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTheRoadies;
