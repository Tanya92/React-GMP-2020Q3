import React from "react";

const Header = ({ info }) => {
  return (
    <div className="header">
      <h1> Header </h1>
      <p>{info}</p>
    </div>
  );
};

export default Header;