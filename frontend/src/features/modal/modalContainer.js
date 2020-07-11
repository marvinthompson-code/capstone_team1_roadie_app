import React, { useState } from "react";
import Modal from "./Modal";

const ModalContainer = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = (e) => {
        if(e.target.id === "modal") {
            toggleModal();
        }
    };

    return (
        <>
        {showModal ? 
            <Modal 
                toggleModal={toggleModal}
                closeModal={closeModal}
            /> :
            null
        }
        </>
    )
};

export default ModalContainer;