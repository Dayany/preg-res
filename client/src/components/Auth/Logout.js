import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import fire from "./Base";

const Logout = () => {
  const handleLogOut = () => {
    fire.auth().signOut().then( window.location.href = "/");
  };

  return(
      <Button onClick={handleLogOut}> <FormattedMessage id="PregRes.signOut" /> </Button>
  )
}

export default Logout;