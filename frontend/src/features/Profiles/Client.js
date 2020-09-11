import React from "react";
import ClientProfile from "../ClientProfile/ClientProfile";
import UploadPictureModal from "../Portfolio/UploadPictureModal";
import UploadVideoModal from "../Portfolio/UploadVideoModal";
import ClientContactForm from "../ClientContactForm/ClientContactForm";
import EditClientProfileForm from "../ClientProfile/EditClientProfileForm";
<<<<<<< HEAD
import EditClientProfilePicForm from "../ClientProfile/EditClientProfilePicForm";
=======
import "../../css/Profiles/Artist.css";
>>>>>>> 5960908255088cc5e7e0b8db74f0a1058caf09c3

const Client = () => {
  return (
    <div className="realArtistProfile container-fluid">
      <div className="row justify-content-md-center">
        <ClientProfile />
      </div>
      <div className="row">
        <UploadPictureModal />
      </div>
      <div className="row">
        <UploadVideoModal />
      </div>
<<<<<<< HEAD
      <div className="row">
        <ClientContactForm />
      </div>
      <div className="row">
        <EditClientProfilePicForm />
      </div>
      <div className="row">
        <EditClientProfileForm />
      </div>
=======
      <ClientContactForm />

      <EditClientProfileForm />
>>>>>>> 5960908255088cc5e7e0b8db74f0a1058caf09c3
    </div>
  );
};
export default Client;
