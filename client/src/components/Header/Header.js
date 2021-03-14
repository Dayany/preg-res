import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { AuthContext } from "../Auth/Auth";
import fire from "../Auth/Base";
import LoginModal from "../Auth/LoginModal";

class Header extends React.Component {
  static contextType = AuthContext;
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">PregRes</Navbar.Brand>
        {this.context.currentUser ? (
          <Navbar.Text>
            <FormattedMessage id="PregRes.signedInAs" />:
            <b> {this.context.currentUser.email}</b>!<span> </span>
            <a onClick={() => fire.auth().signOut()} href="#">
              <FormattedMessage id="PregRes.signOut" />!
            </a>
          </Navbar.Text>
        ) : (
          <Navbar.Text>
            <LoginModal />
          </Navbar.Text>
        )}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title="Language">
            <Nav.Link onClick={() => this.props.setLocaleChild("en")} href="#">
              English
            </Nav.Link>
            <Nav.Link onClick={() => this.props.setLocaleChild("es")} href="#">
              Español
            </Nav.Link>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
