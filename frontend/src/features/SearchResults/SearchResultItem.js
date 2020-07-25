import React from "react";


const SearchResultItem = ({ result }) => {
    const {
        name,
        profile_pic_url
    } = result;

    return (
        <>
            <div className="nameDisplay">
                <h1>{name}</h1>
            </div>
            <div className="picDisplay">
                <img src={profile_pic_url}/>
            </div>
        </>
    )
};

export default SearchResultItem;