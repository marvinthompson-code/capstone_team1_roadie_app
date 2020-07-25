import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { toggleEditClientProfileModalState } from './editClientProfileModalSlice'
import { useSelector, useDispatch } from 'react-redux'
import { apiURL } from '../../util/apiURL'
import Modal from "react-modal";
import axios from 'axios'

const EditClientProfileForm = () => {
    let isOpen = useSelector((state) => state.editClientProfileModal);
    const dispatch = useDispatch()
    const [ name, setName ] = useState("")
    const [ bio, setBio ] = useState("")
    const [ contact_info, setContactInfo ] = useState("")

    const match = useRouteMatch()
    const API = apiURL()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // update client information
        let res = await axios.patch(`${API}/clients/${match.params.id}`)
        debugger
    }

    const closeModal = () => {
        dispatch(toggleEditClientProfileModalState())
    }

    useEffect(() => {
        const fetchClientInfo = async (id) => {
            let res = await axios.get(`${API}/clients/${id}`)
            let { name, profile_pic_url, bio, city, contact_info } = res.data.body.single_client
            setName(name)
            // setProfilePicUrl(profile_pic_url)
            setBio(bio)
            setContactInfo(contact_info)
        }
        // we can also use useParams, ive just been using this lately. Takes the id straight from the url, and since this is a modal, the ending of the url doesnt change, so aye
        fetchClientInfo(match.params.id)
        // call the function here ^^^
    }, [])
    return (
        <Modal
        isOpen={false}
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

            <form onSubmit={handleSubmit}>

                <label>Name</label>
                <input type={"text"} placeholder={name} value={name} onChange={(e) => setName(e.target.value)}/>

                <label>Bio</label>
                <input type={"text"} placeholder={bio} value={bio} onChange={(e) => setBio(e.target.value)}/>

                <label>Contact Info</label>
                <input type={"text"} placeholder={contact_info} value={contact_info} onChange={(e) => setContactInfo(e.target.value)}/>

                <button type={"submit"}>Submit</button>

            </form>

        </Modal>
    )
}

export default EditClientProfileForm;