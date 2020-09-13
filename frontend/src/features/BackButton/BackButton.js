import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
    const history = useHistory();

    return (
        <input onClick={window.history.back()}>Back</input>
    )
};

export default BackButton;