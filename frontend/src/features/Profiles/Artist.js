import React from "react";
import ArtistProfile from "../Artist/ArtistProfile";
import UploadPictureModal from "../Portfolio/UploadPictureModal";
import UploadVideoModal from "../Portfolio/UploadVideoModal";
import BookMeForm from "../Artist/BookMeForm";
import "../../css/Profiles/Artist.css";

const Artist = () => {
  return (
    <div className="realArtistProfile">
      <ArtistProfile />
      <UploadPictureModal />
      <UploadVideoModal />
      <BookMeForm />
    </div>
  );
}

export default Artist;

