import React from 'react'
import '../../css/Contact.css'

const Contact = () => {
    return(
        <div className={"contactContainer"}>
            <h1>Meet the Roadies</h1>
            <div className={"bigRoadieContainer"}>
                <div className={"roadieContainer"}>
                    <div className={"roadieTitleDiv"}>
                        <h2>Marvin Thompson</h2>
                    </div>
                    <div className={"roadieContactDiv"}>
                        <ul className={"contactUl"}>
                            <li className={"roadieLinkedIn"}><a href={"https://www.linkedin.com/in/marvinthompson36/"}>linkedin</a></li>
                            <li className={"roadieEmail"}>marvinthompson@pursuit.org</li>
                        </ul>
                    </div>
                    <div className={"roadieInfoDiv"}>
                        <h3>Technical Lead</h3>
                    </div>
                </div>

                <div className={"roadieContainer"}>
                    <div className={"roadieTitleDiv"}>
                        <h2>Ashya Manning</h2>
                    </div>
                    <div className={"roadieContactDiv"}>
                        <ul className={"contactUl"}>
                            <li className={"roadieLinkedIn"}><a href={"https://www.linkedin.com/in/ashyalmanning/"}>linkedin</a></li>
                            <li className={"roadieEmail"}>ashyamanning@pursuit.org</li>
                        </ul>
                    </div>
                    <div className={"roadieInfoDiv"}>
                        <h3>Project Manager</h3>
                    </div>
                </div>

                <div className={"roadieContainer"}>
                    <div className={"roadieTitleDiv"}>
                        <h2>Henry Nunez</h2>
                    </div>
                    <div className={"roadieContactDiv"}>
                        <ul className={"roadieContactUl"}>
                            <li className={"roadieLinkedIn"}><a href={"https://www.linkedin.com/in/henry-nunez-1a4549b4/"}>linkedin</a></li>
                            <li className={"roadieEmail"}>henrynunez@pursuit.org</li>
                        </ul>
                    </div>
                    <div className={"roadieInfoDiv"}>
                        <h3>UI/UX Manager</h3>
                    </div>
                </div>

                <div className={"roadieContainer"}>
                    <div className={"roadieTitleDiv"}>
                        <h2>Kevin Wong</h2>
                    </div>
                    <div className={"roadieContactDiv"}>
                        <ul className={"roadieContactUl"}>
                            <li className={"roadieLinkedIn"}><a href={"https://www.linkedin.com/in/kevin-wong54/"}>linkedin</a></li>
                            <li className={"roadieEmail"}>kevinwong@pursuit.org</li>
                        </ul>
                    </div>
                    <div className={"roadieInfoDiv"}>
                        <h3>PR Manager</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;