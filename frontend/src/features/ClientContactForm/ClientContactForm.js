import React, { useState, useEffect } from 'react'
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from '../../util/apiURL'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import '../../css/ClientContactForm.css'
import { toggleClientContactModalState } from "../ClientContactForm/clientContactModalSlice";

const ClientContactForm = () => {
    const [name, setName] = useState("")
    const [body, setBody] = useState("")
    const [contact_info, setContact_info] = useState("")
    const [city, setCity] = useState("")
    const [clientName, setClientName] = useState("");
    let isOpen = useSelector((state) => state.clientContactModal);
    const artist = useSelector((state) => state.artist);
    const client = useSelector((state) => state.client);
    const history  = useHistory()
    const dispatch = useDispatch()
    const API = apiURL()
    const match = useRouteMatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (artist && client === null) {
            history.push("/login")
        }
        // however we send the body, maybe an email?
    }

    const closeModal = () => {
        dispatch(toggleClientContactModalState())
    }


    useEffect(() => {
        const fetchArtistInfo = async (id) => {
            let res = await axios.get(`${API}/artists/${id}`)
            setName(res.data.body.single_artist.name)
            setCity(res.data.body.single_artist.city)
            setContact_info(res.data.body.single_artist.contact_info)
        }

        const fetchClientInfo = async (id) => {
            let res = await axios.get(`${API}/clients/${id}`)
            setName(res.data.body.single_client.name)
            setCity(res.data.body.single_client.city)
            setContact_info(res.data.body.single_client.contact_info)
        }

        if (artist) {
            fetchArtistInfo(artist.id)
        } else if (client) {
            fetchClientInfo(client.id)
        } else if (artist === null && client === null) {
            setName("Please input name...")
        }

    });

    useEffect(() => {
        const fetchClientName = async (id)  => {
            let res = await axios.get(`${API}/clients/${id}`);
            setClientName(res.data.body.single_client.name);
        };
        fetchClientName(match.params.id);
    }, [])

    return (
         <Modal
         isOpen={false}
         onRequestClose={closeModal}
         isOpen={isOpen}
         style={{
            content: {
                backgroundColor: "#164444",
                borderRadius: "20px",
                left: "25%",
                right: "25%",
              }
         }}
         >
            <div>
                <form onSubmit={handleSubmit} className={"ContactMeForm"}>
                    <div className={"inputDiv"}>
                        <div className="clientNameDiv">
                            <h1>Contact {clientName}!</h1>
                        </div>
                        <div className={"contactNameDiv"}>
                            <input id={"contactNameInput"} type={"text"} value={name} onChange={(e) => setName(e.target.value)} placeholder={name}/>
                        </div>
                        <div className={"contactBodyDiv"}>
                            <input id={"contactBodyInput"} type={"text"} value={body} onChange={(e) => setBody(e.target.value)} placeholder={"Briefly tell me who you are!"}/>
                        </div>

                        <div className={"contactNumberDiv"}>
                            <h3 className={"contact"}>{contact_info}</h3>
                        </div>

                        <div className={"cityDiv"}>
                            <h3 className={"city"}>{city}</h3>
                        </div>

                        <div className={"contactButtonDiv"}>
                        <button id={"contactSubmitButton"} type={"submit"}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default ClientContactForm;