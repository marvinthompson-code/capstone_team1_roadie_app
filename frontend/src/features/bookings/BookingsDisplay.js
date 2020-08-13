import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import axios from "axios";

const BookingsDisplay = () => {
    const [bookings, setBookings] = useState([]);

    const API = apiURL();
    const match = useRouteMatch();

    useEffect(() => {
        const fetchArtistBookings = async (id) => {
            let res = await axios.get(`${API}/artists/${id}/bookings`);
            setBookings(res.data.body.artistBookings);
            debugger;
        };
        fetchArtistBookings(match.params.id);
    }, []);

    const artistBookingsThumbs = bookings.forEach((booking) => {
        return (
            <div className="artistBookingContainer">
                <li key={booking.id}>
                    <div>
                        <h2>{booking.name}</h2>
                    </div>
                    <div>
                        <h3>{booking.venue}</h3>
                    </div>
                </li>
            </div>
        )
    })
    
    return (
        <div className="BookingsDisplayContainer">
            <h2>Upcoming shows!</h2>

          </div>
    )
};

export default BookingsDisplay;