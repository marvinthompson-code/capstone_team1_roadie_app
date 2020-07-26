import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SearchResultItem = ({ result }) => {
    const userType = useSelector(state => state.userType);
    const {
        name,
        profile_pic_url,
        id
    } = result;

    const history = useHistory()

    const setHistory = (id) => {
        if (userType === "Artist") {
            history.push(`/artist/${id}`);
        } else if (userType === "Client") {
            history.push(`/client/${id}`);
        }
    };

    return (
        <>
            <div className="nameDisplay">
                <h1 onClick={() => setHistory(id)}>{name}</h1>
            </div>
            <div className="picDisplay">
                <img src={profile_pic_url}/>
            </div>
        </>
    )
};

export default SearchResultItem;