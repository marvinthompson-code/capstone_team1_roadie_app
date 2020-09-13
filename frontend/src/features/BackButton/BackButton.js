import React from "react";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import "../../css/BackButton.css";

const BackButton = () => {
    const history = useHistory();
    const match = useRouteMatch();

    const handleBackButton = () => {
        history.goBack();
        // history.push(`/media/videos/client/${match.params.id}`);
    };

    return (
        <button className="backButton" onClick={handleBackButton}>Back</button>
    )
};

export default BackButton;