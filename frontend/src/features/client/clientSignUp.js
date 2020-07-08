import React from "react";
import { signUp } from "../../util/firebaseFunctions";

const ClientSignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sign up with firebase and send results to our backend
      let res = await signUp();
    } catch (error) {}
  };

  return (
    <div className="clientSignUpForm">
      <h3>Client Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="Company Name" />
        <input type="text" placeholder="Bio" />
        <input type="text" placeholder="Contact Information" />
        <div className="clientSignUpImgUpload">
          <p>Upload Image</p>
          <button>Upload</button>
        </div>

        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};
export default ClientSignUp;
