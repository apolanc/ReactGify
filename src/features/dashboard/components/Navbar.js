import React from "react";
import { NavLink } from "react-router-dom";

const logo = "/assets/logo.png";

const Navbar = () => (
  <nav className="nav">
    <div className="nav-container">
      <NavLink to="/dashboard">
        <img src={logo} className="logo" alt="logo" />
      </NavLink>
    </div>
  </nav>
);

export default Navbar;
