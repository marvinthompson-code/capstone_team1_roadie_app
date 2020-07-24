import React from "react";

const ArtistPortfolio = () =>{

    return(
        <div className="artistPortfolioContainer">
            <div className="portfolioHeader">
                <img/>
                <button>Book Me!</button>
            </div>
            <div className="artistName">
            <h1>Artist Name</h1>
            </div>
            <div className="artistBio">
                <h4>Bio</h4>
            </div>
            <div className="artistShowDates">
                <h4>Upcoming Shows</h4>
                <ul>
                    <li>mm/dd/yyyy</li>
                    <li>mm/dd/yyyy</li>
                    <li>mm/dd/yyyy</li>
                    <li>mm/dd/yyyy</li>
                    <li>mm/dd/yyyy</li>
                </ul>
            </div>
            <div className="artistMediaContainer">
            <div className="artistAlbumDiv">
                <h2>Artist Album</h2>
                <button>Upload Picture</button>
            </div>
            <div className="artistVideoDiv">
                <h2>Artist Videos</h2>
                <button>Upload Picture</button>
            </div>
            </div>
        </div>
    )

}
export default ArtistPortfolio; 