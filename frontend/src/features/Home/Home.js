import React from "react";
import Search from "./Search";
import BookMeForm from "../Artist/BookMeForm";
import About from './About'
import "../../css/Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="searchHomeContainer">
        <div className="pinkContainer">
          <div className="titleContainer">
            <h1 id="titleHeader">WELCOME TO ROADIE</h1>
          </div>
          <Search />
        </div>
      </div>
      <div className="aboutContainer">
        <About />
      </div>
    </div>
  );
};

export default Home;
