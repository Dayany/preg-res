import { store } from "react-notifications-component";

//TODO: Use Intl support for messages
// title: "PregRes.perfect",
// message: "PregRes.Notification.questionAdded",
export function questionAddedNotification() {
  store.addNotification({
    title: "Perfect!",
    message: "Your question has been added successfully",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}

export function answerAddedNotification() {
  store.addNotification({
    title: "Perfect!",
    message: "Your answer has been added successfully",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}
export function errorNotAddedNotification() {
  store.addNotification({
    title: "Oh oh!",
    message: "There was a problem with your request",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}
