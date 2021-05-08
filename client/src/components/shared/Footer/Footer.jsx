import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <p className="footer-link">
          {" "}
          Andri Rafti
          <i id="icon" className="fa fa-linkedin" aria-hidden="true"></i>
        </p>
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/irma-leandre-660313154/"
          target="blank"
        >
          {" "}
          Irma Leandre
          <i id="icon" className="fa fa-linkedin" aria-hidden="true"></i>
        </a>
        <p className="footer-link">
          {" "}
          Jordan Montero
          <i id="icon" className="fa fa-linkedin" aria-hidden="true"></i>
        </p>
        <p className="footer-link">
          {" "}
          Nyheim Hunter
          <i id="icon" className="fa fa-linkedin" aria-hidden="true"></i>
        </p>
      </div>
    </div>
  );
};

export default Footer;
