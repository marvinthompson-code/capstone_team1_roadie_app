import React from 'react';
import ClientProfile from '../ClientProfile/ClientProfile';
import ClientContactForm from '../ClientContactForm/ClientContactForm';
import EditClientProfileForm from '../ClientProfile/EditClientProfileForm';



const Client = () =>{
    return(
        <div className="realArtistProfile container-fluid">
            <div className="row justify-content-md-center">
            <ClientProfile />
            </div>
            <div className="row">
            <ClientContactForm />
            </div>
            <div className="row">
            <EditClientProfileForm />
            </div>
        </div>
    )
};
export default Client;