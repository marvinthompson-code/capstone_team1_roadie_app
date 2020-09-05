import React from "react";
import { apiURL } from "../../util/apiURL";

const DeclineBookingRequestModal = () => {
  const API = apiURL();

  return (
    <div
      className="modal fade"
      id="declineBookingRequestModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header declineBookingRequestHeader">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Are you sure you want to decline?
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body declineBookingRequestBody">
            <form>
              <input
                type="submit"
                className="btn btn-primary activeButton"
                name="Click Here"
              />
            </form>
          </div>
          <div className="modal-footer declineBookingRequestBody">
            <button
              type="button"
              className="btn btn-secondary declineBookingRequestCloseButton"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclineBookingRequestModal;
