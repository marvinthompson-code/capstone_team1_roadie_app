import React, { useState, useEffect } from 'react'
import { useDispatch} from "react-redux";
import { toggleModalState } from "../Artist/modalSlice";
import { toggleEventModalState } from "../event/eventModalSlice"
import { toggleEditClientProfileModalState } from './editClientProfileModalSlice'
import axios from 'axios'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { apiURL } from '../../util/apiURL'
import '../../css/ClientProfile.css'

const ClientProfile = () => {
    const [ name, setName ] = useState("")
    const [ bio, setBio ] = useState("")
    const [ contactInfo, setContactInfo ] = useState("")
    const [ city, setCity ] = useState("")
    const [ profilePicUrl, setProfilePicUrl ] = useState("")

    const API = apiURL()
    const match = useRouteMatch()
    const dispatch = useDispatch()
    // const params = useParams()
    const history = useHistory()

    // created events? 

    // const handleClick = () => {
    //     dispatch(toggleModalState())
    // }

    useEffect(() => {
        const fetchUserInfo = async (id) => {
            let res = await axios.get(`${API}/clients/${id}`)
            let { name, profile_pic_url, bio, city, contact_info } = res.data.body.single_client
            setName(name)
            setProfilePicUrl(profile_pic_url)
            setBio(bio)
            setCity(city)
            setContactInfo(contact_info)
        }
        fetchUserInfo(match.params.id)
    }, [])

    return (
        <div>
            <div className={"ProfilePictureDiv"}>
                <img src={profilePicUrl} alt={"Client Profile"} />
            </div>

            <div className={"buttonsDiv"}>
                <button id={"ContactMeButton"}onClick={() => dispatch(toggleModalState())}>Contact Me!</button>
                <button id={"EditClientProfileButton"} onClick={() => dispatch(toggleEditClientProfileModalState())} >Edit Profile</button>
            </div>

            

            <div className={"ClientNameDiv"}>
                <h2 className={"name"}>{name}</h2>
            </div>
            <div className={"InfoDiv"}>

            <div className={"CityDiv"}>
                <label>City:</label>
                    <h3 className={"city"}>{city}</h3>
            </div>

            <div className={"ContactInfoDiv"}>
                <label>Contact:</label>
                    <h3 className={"contact"}>{contactInfo}</h3>
            </div>


            </div>
            <div className={"BioPortfolioContainer"}>
                <div className={"BioDiv"}>
                    <h4 className={"aboutMe"}>About me:</h4>
                    <h3 className={"bio"}>{bio}</h3>
                </div>

            <div className={"eventDiv"}>
                    
                <div className={"eventTitleDiv"}>
                <h3 className={"eventsTitle"}>Created Events</h3>
                </div>
                <ul className={"eventUl"}>
                    <li>Example Event 1</li>
                    <li>Example Event 2</li>
                    <li>Example Event 3</li>
                    <li>Example Event 4</li>
                </ul>
                
            <div className={"createEventButtonDiv"}>
                <button id={"CreateEventButton"}onClick={() => dispatch(toggleEventModalState())}>Create Event</button>
            </div>

            </div>
            <div className={"portfolioSection"}>

            </div>

            </div>
        </div>
    )
}

export default ClientProfile