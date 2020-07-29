import React from 'react'
import Search from './Search'
import BookMeForm from "../Artist/BookMeForm";
import "../../css/Home.css";


const Home = () => {

    return(
        <div className="homeContainer">

            <div className="searchHomeContainer">
                <h1 className="welcomeTitle">
                WELCOME TO ROADIE
                </h1>
                <Search />
            </div>

            <div className="bookMeFormContainer">
                <BookMeForm />
            </div>
        </div>
    )
}

export default Home

