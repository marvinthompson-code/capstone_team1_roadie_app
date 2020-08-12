import React, { useState, useEffect } from "react";
import { toggleEventModalState } from "./eventModalSlice";
import { receiveSearch } from '../SearchResults/searchSlice'
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import VenueSearchIndex from './VenueSearchIndex'

const VenueSearchForm = () => {
    
}