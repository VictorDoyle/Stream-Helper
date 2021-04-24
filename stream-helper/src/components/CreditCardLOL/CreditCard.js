import React, { useEffect, useState } from "react";
import "../../styles/MovieCard.css";

function CreditCard(props) {
  // console.log(props);

  return (
    <>
      <div>
        <h5>{props.name}</h5>
      </div>
    </>
  );
}

export default CreditCard;
