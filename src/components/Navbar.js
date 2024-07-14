import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {menuOpen && (
        <div className="navbar-links">
          <Link to="/campaigns" onClick={toggleMenu}>Campaigns</Link>
          <Link to="/segmentation" onClick={toggleMenu}>Segmentation</Link>
          <Link to="/schedule-send" onClick={toggleMenu}>Schedule/Send</Link>
          <Link to="/autoreplies" onClick={toggleMenu}>Auto Replies</Link>
          <Link to="/incoming-emails" onClick={toggleMenu}>Incoming Emails</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

