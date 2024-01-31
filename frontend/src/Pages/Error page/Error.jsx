import React from "react";
import error from "../../images/error.jpg";
import "./error.css";
function Error() {
  return (
      <div className="error-page">
        <img src={error} alt="" />
        <button>Go to homepage</button>
      </div>
      
  );
}

export default Error;
