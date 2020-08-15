import React from 'react';
import ClientProfile from '../ClientProfile/ClientProfile';
import ClientContactForm from '../ClientContactForm/ClientContactForm';
import EditClientProfileForm from '../ClientProfile/EditClientProfileForm';

const Client = () =>{
    return(
        <div className="realClientProfile">
            <ClientProfile />
            <ClientContactForm />
            <EditClientProfileForm />
        </div>
    )
};
export default Client;