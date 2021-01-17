import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

// OAuth Client ID 136748314444-650gfmvcevjqsgd8n8rql2jt42ik0j7k.apps.googleusercontent.com
// Client secret RpI2qRS06yZApYnpGoAnX61o

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
