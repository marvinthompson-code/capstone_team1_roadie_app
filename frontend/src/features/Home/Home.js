import React from "react";
import Search from "./Search";
import { useSelector } from "react-redux";
import "../../css/Home.css";

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
    </div>
  );
};

export default Home;
