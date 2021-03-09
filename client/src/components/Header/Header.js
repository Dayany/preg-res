import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    {
      return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#">PregRes</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown title="Language" id="basic-nav-dropdown">
              <Nav.Link
                onClick={() => this.props.setLocaleChild("en")}
                href="#"
              >
                English
              </Nav.Link>
              <Nav.Link
                onClick={() => this.props.setLocaleChild("es")}
                href="#"
              >
                Espanol
              </Nav.Link>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

export default Header;
