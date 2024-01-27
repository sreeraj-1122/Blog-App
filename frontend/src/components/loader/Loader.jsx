import React from "react";

import { TailSpin } from "react-loader-spinner";

function Loader({ loading }) {
  return (
    <div className="d-flex justify-content-center h-50 align-items-center ">
      <TailSpin
        visible={loading}
        height="70"
        width="70"
        ariaLabel="tail-spin-loading"
        radius="1"
        color="#4fa94d"
      />
    </div>
  );
}

export default Loader;
