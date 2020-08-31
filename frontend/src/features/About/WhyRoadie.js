import React from "react";
import "../../css/WhyRoadie.css";

const WhyRoadie = () => {
  return (
    <div className="container whyRoadie">
      <div class="jumbotron jumbotron-fluid text-center whyRoadieJumbotron">
        <div class="row justify-content-center text-center whyRoadieHeader">
          <h1 class="display-4" id="whyRh">So, why <span id="WhyR">R</span>oadie?</h1>
        </div>
        <div className="row justify-content-center text-center whyRoadieSubHeader">
          <h4 id="whyRH4">
            The music industry is a vast, dynamic atmosphere that creatives
            strive to flourish in. However, oftentimes it is proven to be
            inaccessible to beginners and upcoming artists who are looking to
            make a name for themselves.
          </h4>
        </div>
        <div className="row justify-content-center text-center whyRUl">
        <ul id="whyRUl">
          <div>
            <li>
              {" "}
              <p>
              <span className="badge badge-success whyBadge">R</span>
                There are too many outside parties involved in negotiating
                affairs.
              </p>
            </li>

            <li>
              {" "}
              <p>
              <span className="badge badge-success whyBadge">R</span>
                There is no existing road map for musicians to book and plan
                effectively.
              </p>
            </li>

            <li>
              {" "}
              <p>
              <span className="badge badge-success whyBadge">R</span>
                There is no standing application to handle booking and event
                management.
              </p>
            </li>
          </div>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyRoadie;
