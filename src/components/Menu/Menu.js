import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
 render(){
   return <nav role="navigation">
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/sale/">New Sale</Link>
          </li>
          <li>
            <Link to="/order/">Orders</Link>
          </li>
          <li>
            <Link to="/product/">Products</Link>
          </li>
          <li>
            <Link to="/report/">Reports</Link>
          </li>
        </ul>
      </nav>
 }
}

export default Menu;
