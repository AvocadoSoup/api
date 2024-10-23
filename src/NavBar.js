import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';

function NavBar() {
  return (
    <div className="nav-top">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/items">Browse Breeds</Link></li>
      </ul>
    </div>
  );
}

export default NavBar;
