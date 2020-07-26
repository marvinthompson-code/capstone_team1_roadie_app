import React from "react";
import { useSelector } from "react-redux";
import { searchRes } from "./searchSlice";
import SearchResultItem from "./SearchResultItem";

const SearchIndex = () => {
  const searchResults = useSelector(searchRes);

  const results = searchResults.map((result) => {
    return <SearchResultItem key={result.id} result={result} />;
  });

<<<<<<< HEAD
    return (
        <div>
            { !searchResults.length ?
                <h3>No results!</h3> :
                results  
            }
        </div>
    )
=======
  return (
    <div>{!searchResults.length ? <h3>No results!</h3> : { results }}</div>
  );
>>>>>>> 1bbdd9c4138dba3ce01611da5c04dc487f00b665
};

export default SearchIndex;
