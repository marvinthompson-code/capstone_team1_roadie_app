import React from "react";


const SearchResultItem = ({ result }) => {
    const {
        name,
        profile_pic_url
    } = result;

    return (
        <>
            <div>
                <h1>{name}</h1>
            </div>
            <div>
                {profile_pic_url}
            </div>
        </>
    )
};

export default SearchResultItem;