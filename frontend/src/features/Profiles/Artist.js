import React from 'react';
import Portfolio from "../Portfolio/Portfolio"
import ArtistProfile from '../Artist/ArtistProfile';
import UploadPictureModal from '../Portfolio/UploadPictureModal';
import UploadVideoModal from '../Portfolio/UploadVideoModal';
import BookMeForm from '../Artist/BookMeForm';

const Artist = () =>{
    return (
        <div className="realArtisitProfile">
            <ArtistProfile />
            <Portfolio />
            <UploadPictureModal />
            <UploadVideoModal />
            <BookMeForm />
        </div>
    )
};
export default Artist;
