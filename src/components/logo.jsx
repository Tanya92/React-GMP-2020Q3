import React from "react";

import logoImage from "../assets/react-logo";

class Logo extends React.PureComponent {
  render() {
    return (
      <div className="logo">
        <h4>Logo Component</h4>
        <p>React.PureComponent</p>
        <img src={logoImage} alt="logo-component" />
      </div>
    );
  }
}

export default Logo;
