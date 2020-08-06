import React from "react";
import { Link, useLocation } from "react-router-dom";
import dwellinglylogo from "../../assets/images/dwellingly_logo_white.png";
import LogOutButton from "./LogOutButton";

const Header = (props) => {
  const loc = useLocation();

  if(loc.pathname === "/terms") {
    return null;
  }
	return (
    <header className="navbar bg-gradient">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={dwellinglylogo} alt="dwellingly logo" />
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="is-logout-button">
            <LogOutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
