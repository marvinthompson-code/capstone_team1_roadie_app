import React from "react";
import Login from "../login/Login";
import "../../css/Modal.css";

const Modal = ({ toggleModal, closeModal }) => {
    return (
        <aside id="modal" className="modalWrapper" onClick={closeModal}>
            <div className="modalInner">
                <span className="close" onClick={toggleModal}>X</span>
                <Login />
            </div>
        </aside>
    )
};

export default Modal;