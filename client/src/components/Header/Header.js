import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    {
      return (
        <section style={{ background: "#e9ecef" }} className="text-right">
          <a href="#" onClick={() => this.props.setLocaleChild("en")}>
            English
          </a>
          /
          <a href="#" onClick={() => this.props.setLocaleChild("es")}>
            Español
          </a>
        </section>
      );
    }
  }
}

export default Header;
