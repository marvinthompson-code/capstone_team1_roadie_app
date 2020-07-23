import React, { useState, useEffect } from "react";
import { apiURL } from "../../util/apiURL";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalState } from "./modalSlice";
import Modal from "react-modal";

import axios from "axios";

const BookMeForm = () => {
    const [bio, setBio] = useState("");
    const [emailContact, setEmailContact] = useState("");
    const [numberContact, setNumberContact] = useState("");
    const [events, setEvents] = useState([]);

    const API = apiURL();
    const client = useSelector(state => state.client);
    const isOpen = useSelector(state => state.modal);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        dispatch(toggleModalState());
    };

    const handleClientEventSelect = async (id) => {
        let res = await axios.get(`${API}/events/${id}`);
        debugger;
        console.log(res.data.body);
        let { events } = res.data.body;
        setEvents(events);  
    };

    const clientEvents = events.forEach(event => {
            return <option key={event.id}>
                {event.name}
            </option>
    });

    useEffect(() => {
        // handleClientEventSelect(client.id);
    }, [])

    return (
        <Modal
            isOpen={true}
            onRequestClose={closeModal}
            isOpen={isOpen}
        >
            <div>
                <h1>Book Me!</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Event:
                            <select>
                                <option selected disabled>
                                    Select an event
                                </option>
                                {clientEvents}
                            </select>

                        </label>
                    </div>
                    <div>
                        <label>
                            Tell me a little something:
                            <input type="text" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Contact Info:
                            <input type="email" placeholder="Email Contact" value={emailContact} onChange={(e) => setEmailContact(e.target.value)} required/>
                            <input type="tel" placeholder="Number Contact" value={numberContact} onChange={(e) => setNumberContact(e.target.value)} required/>
                        </label>
                    </div>
                    <div>
                        <button type="submit">Request Roadie</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
};

export default BookMeForm;