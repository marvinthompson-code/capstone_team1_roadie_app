import React from 'react'
import { useSelector } from 'react-redux'
import VenueCardDisplay from './VenueCardDisplay'
import '../../css/VenueSearchIndex.css'

const VenueSearchIndex = () => {
    const venues = useSelector(state => state.venues)
    const venueResults = venues.map((venue) => {
        return <VenueCardDisplay venue={venue} key={venue.id}/>
    })
    return(
        <div>
            {venues.length === 0? <h2>No results!</h2> : venueResults}
        </div>
    )
}

export default VenueSearchIndex;