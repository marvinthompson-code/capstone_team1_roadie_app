import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { searchRes } from "./searchSlice";
import SearchResultItem from "./SearchResultItem";
import "../../css/SearchIndex.css";

const SearchIndex = () => {
  const searchResults = useSelector(searchRes);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const results = searchResults.map((result) => {
    return <SearchResultItem key={result.id} result={result} />;
  });

  return (
    <div className="container resultContainer">
      {!searchResults.length ? (
        <h3 style={{ color: "#9a8378" }}>Sorry, no results!</h3>
      ) : (
        results
      )}
    </div>
  );
};

export default SearchIndex;
