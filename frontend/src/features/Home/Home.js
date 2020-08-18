import React from "react";
import Search from "./Search";
import About from './About'
// import "../../css/Home.css";

const Home = () => {
  return (
    <div className="jumbotron text-center">
  <h1 className="display-4">Roadie</h1>
  <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  <Search />
  </div>
  );
};

export default Home;
