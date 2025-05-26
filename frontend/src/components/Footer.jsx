import React from 'react';
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <small>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</small>
      </div>
    </footer>
  );
}

export default Footer;

