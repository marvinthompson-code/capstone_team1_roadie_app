import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { apiURL } from "../../../util/apiURL";
import axios from "axios";

const IndividualPicture = () => {
  const [user, setUser] = useState({});
  const match = useRouteMatch();
  const API = apiURL();

    useEffect(() => {
        const fetchArtistPicture = async (artist_id, id) =>{
            let res = await axios.get(`${API}/media/pictures/artist/${artist_id}/picture/${id}`)
            setUser(res.data.body.picture)
        };

    },[])



  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndividualPicture;
