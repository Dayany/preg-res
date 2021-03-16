import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "firebase/firestore";

function Notification() {
  return (
    <div>
      <ReactNotification />
    </div>
  );
}

export default Notification;
