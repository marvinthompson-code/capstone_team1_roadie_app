import React, {useState, useEffect} from 'react'
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "../Artist/modalSlice";

const ClientContactForm = () => {
    const [name, setName] = useState("")
    const [body, setBody] = useState("")
    let isOpen = useSelector((state) => state.modal);

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        // however we send the body, maybe an email?
    }

    const closeModal = () => {
        dispatch(toggleModalState())
    }

    return (
         <Modal
         isOpen={true}
         onRequestClose={closeModal}
         isOpen={isOpen}
         style={{
            content: {
                backgroundColor: "#F4D8CD",
                borderRadius: "13px",
                left: "25%",
                right: "25%",
              }
         }}
         >
            <div>
                <form onSubmit={handleSubmit} className={"ContactMeForm"}>
                    <div className={"contactNameDiv"}>
                        <input id={"contactNameInput"} type={"text"} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Enter your name..."}/>
                    </div>
                    <div className={"contactBodyDiv"}>
                        <input id={"contactBodyInput"} type={"text"} value={body} onChange={(e) => setBody(e.target.value)} placeholder={"Enter your Message..."}/>
                    </div>
                    <div className={"contactButtonDiv"}>
                    <button id={"contactSubmitButton"} type={"submit"}>Submit</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default ClientContactForm;