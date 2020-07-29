import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import { toggleEventDisplayState } from "./eventDisplaySlice"
import { apiURL } from "../../util/apiURL";

const EventDisplay = async ({ id, client_id }) => {
    const isOpen = useSelector(state => state.eventDisplay)
    const dispatch = useDispatch()
    const API = apiURL()
    const closeModal = () => {
       dispatch(toggleEventDisplayState())
    }
    let res = await axios.get(`${API}/events/${id}/${client_id}`)
    debugger
    let { name, venue, date, city, address } = res.data.body.event
    debugger 
        
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
    <div>
        <h2 className={"eventName"}>{name}</h2>
        <div className={"venueDateContainer"}>
          <h3 id={"date"}>{date}</h3>
          <h3 id={"venue"}>{venue}</h3>
          <h3 id={"address"}>{address}</h3>
        < h3 id={"city"}>{city}</h3>
        </div>
    </div>
</Modal>
  )
}

export default EventDisplay;