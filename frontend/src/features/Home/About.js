import React from 'react'
import '../../css/About.css'
const About = () => {

    return(
        <div className="aboutRoadieContainer">
            <div className={"aboutRoadieText"}>
                
          <div className={"aboutTitleContainer"}>
            <h1 id="titleHeaderAbout">How does it work?</h1>
          </div>
          <div className={"aboutParagraphContainer"}>
            <p className={"aboutParagraph1"}> Roadie is an all in one booking platform for Artists and Clients, designed to remove the hassle of event booking that often plagues the music industry.</p>
          </div>

          <div className={"aboutParagraphContainer"}>
              <ul className={"aboutUl"}>
                  <li className={"aboutLi"}><p>Artists can create/personalize a profile, accept show requests and display upcoming shows on their profile.</p></li>
                  <li className={"aboutLi"}><p>Clients/Booking agents can create a profile, create events, and request artists to play the event. They can display a record of created events on their profile.</p></li>
              </ul>
          </div>
        </div>

        <div className={"aboutRoadieImg"}>
            
        </div>
          
      </div>
        
    )
}

export default About;