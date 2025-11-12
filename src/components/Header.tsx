import React from 'react';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {

  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>

  );

};


export default Header;