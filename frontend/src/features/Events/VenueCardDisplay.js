import React from 'react'

const VenueCardDisplay = ({ venue }) => {
    let { name } = venue
    let { address, crossStreet, lat, lng, postalCode, cc, city, state } = venue.location
        let { prefix, suffix } = venue.categories[0].icon
        return (
        <div key={venue.id}>
            <div className={"venueNameDiv"}><h2 className={"venueName"}>{name}</h2></div>
            <div className={"venueImageDiv"}>
                <img src={`${prefix}${suffix}`} alt={"venue"} className={"venueImage"}/>
            </div>
            <div className={"venueAddressDiv"}>
                <h3>{address}</h3>
                <h3>{city}</h3>
                <h3>{state}</h3>
                <h3>{cc}</h3>
                <h3>{postalCode}</h3>
            </div>
            <div className={"venueCrossStreetDiv"}><h2>{crossStreet}</h2></div>
        </div>
        )
}

export default VenueCardDisplay