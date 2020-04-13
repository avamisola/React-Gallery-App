import React from 'react';
import {NavLink} from 'react-router-dom';

//link navigation buttons to search result pages
const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to='/search/Sun'>Sun</NavLink></li>
        <li><NavLink to='/search/Moon'>Moon</NavLink></li>
        <li><NavLink to='/search/Stars'>Stars</NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav;