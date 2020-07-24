import React from 'react'
import Search from './Search'
import BookMeForm from "../Artist/BookMeForm";


const Home = () => {

    return(
        <>
            <div>
                WELCOME TO ROADIE
                <Search />
            </div>
            <div>
                <BookMeForm />
            </div>
        </>
    )
}

export default Home

