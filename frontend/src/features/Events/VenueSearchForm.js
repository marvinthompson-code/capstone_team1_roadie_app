import React, { useState, useEffect } from "react";
import { toggleEventModalState } from "./eventModalSlice";
import { receiveSearch } from '../SearchResults/searchSlice'
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import VenueSearchIndex from './VenueSearchIndex'

const VenueSearchForm = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [venue, setVenue] = useState("");
    const {
        API_CLIENT_ID,
        API_CLIENT_SECRET
      } = process.env

    const dispatch = useDispatch();

}