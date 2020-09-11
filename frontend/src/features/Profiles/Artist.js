import React from "react";
import ArtistProfile from "../Artist/ArtistProfile";
import UploadPictureModal from "../Portfolio/UploadPictureModal";
import UploadVideoModal from "../Portfolio/UploadVideoModal";
import EditArtistProfileForm from "../Artist/EditArtistProfileForm";
import BookMeForm from "../Artist/BookMeForm";
import "../../css/Profiles/Artist.css";
import EditArtistProfilePicForm from "../Artist/EditArtistProfilePicForm";

const Artist = () => {
  return (
    <div className="realArtistProfile container-fluid">
      <div className="row justify-content-md-center">
        <ArtistProfile />
      </div>
      <div className="row">
        <UploadPictureModal />
      </div>
      <div className="row">
        <UploadVideoModal />
      </div>
<<<<<<< HEAD
      <div>
      <BookMeForm />
=======
      <div className="row">
        <BookMeForm />
>>>>>>> 5960908255088cc5e7e0b8db74f0a1058caf09c3
      </div>
      <div className="row">
        <EditArtistProfileForm />
      </div>
      <div className="row">
        <EditArtistProfilePicForm />
      </div>
    </div>
  );
};

export default Artist;
