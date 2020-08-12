import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const VenueSearchIndex = ({ venues }) => {
    // iterate through the venues
    // forEach venue display a name and address, thumbnail picture
    // const venueResults
    const venueResults = venues.forEach((venue) => {
        // stuff happens here
    })

    return(
        <div>
            {venues.length === 0? <h2>No results!</h2> : venueResults}
        </div>
    )
}

export default VenueSearchIndex;