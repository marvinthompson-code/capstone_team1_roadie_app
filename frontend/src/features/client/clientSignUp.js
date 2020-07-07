import React from 'react';

const ClientSignUp = () =>{
    return(
        <div className="clientSignUpForm">
            <h3>Client Sign Up</h3>
            <form>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="Company Name"/>
            <input type="text" placeholder="Bio"/>
            <input type="text" placeholder="Contact Information"/>
            <div className="clientSignUpImgUpload">
            <p>Upload Image</p>
            <button>Upload</button>
            </div>
            
            <input type="submit" value="Sign Up"/>
            </form>
        </div>
    )

}
export default ClientSignUp;