import React from "react";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import axios from "axios";

const ClientSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [company, setCompany] = useState("");
  const [bio, setBio] = useState("");
  const [contact, setContact] = useState("");

  const API = apiURL();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await signUp(email, password);
      await axios.post(`${API}/clients`, {
        id: res.user.uid,
        name,
        profilePicUrl,
        bio,
        pricing,
        company,
        city,
        contact,
      });
      dispatchEvent(updateArtist(res.user));
      // sign up with firebase and send results to our backend
    } catch (error) {
      console.log(errror.message);
    }
  };

  return (
    <div className="clientSignUpForm">
      <h3>Client Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <input
          type={"text"}
          placeholder={"name"}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <input
          type={"text"}
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type={"text"}
          placeholder={"city"}
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <input
          type={"password"}
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type={"text"}
          placeholder={"company name"}
          value={company}
          onChange={(e) => setCompany(e.currentTarget.value)}
        />
        <input
          type={"text"}
          placeholder={"bio"}
          value={bio}
          onChange={(e) => setBio(e.currentTarget.value)}
        />
        <input
          type={"text"}
          placeholder={"Contact Information"}
          value={contact}
          onChange={(e) => setContact(e.currentTarget.value)}
        />
        <div className="clientSignUpImgUpload">
          <p>Upload Image</p>
          <input type="submit" value="upload" />
        </div>

        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};
export default ClientSignUp;
