import React from "react";
import ClientProfile from "../ClientProfile/ClientProfile";
import UploadPictureModal from "../Portfolio/UploadPictureModal";
import UploadVideoModal from "../Portfolio/UploadVideoModal";
import ClientContactForm from "../ClientContactForm/ClientContactForm";
import EditClientProfileForm from "../ClientProfile/EditClientProfileForm";
import "../../css/Profiles/Artist.css";

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
      <ClientContactForm />

      <EditClientProfileForm />
    </div>
  );
};
export default Client;
