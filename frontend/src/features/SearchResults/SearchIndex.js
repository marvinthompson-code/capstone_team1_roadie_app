import React from "react";
import { useSelector } from "react-redux";
import { searchRes } from "./searchSlice";
import SearchResultItem from "./SearchResultItem";
import "../../css/SearchIndex.css";

const SearchIndex = () => {
  const searchResults = useSelector(searchRes);

  const results = searchResults.map((result) => {
    return <SearchResultItem key={result.id} result={result} />;
  });

    return (
        <div className="resultContainer">
            { !searchResults.length ?
                <h3>No results!</h3> :
                results  
            }
        </div>
    )
};

export default SearchIndex;
