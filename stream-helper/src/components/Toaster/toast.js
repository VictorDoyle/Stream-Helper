import React from "react";

import { ToastContainer, toast } from "react-toastify";

function Toasty() {
  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <div className="toasterstyle">
        <ToastContainer className="toasterstyle" />
      </div>
    </div>
  );
}

export default Toasty;
