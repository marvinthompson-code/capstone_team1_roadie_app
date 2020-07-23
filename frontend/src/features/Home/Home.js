import React from 'react'
import Search from './Search'
import BookMeForm from "../Artist/BookMeForm";


const Home = () => {

    return(
        <>
            <div>
                THIS IS THE HOME PAGE
                <Search />
            </div>
            <div>
                <BookMeForm />
            </div>
        </>
    )
}

export default Home

