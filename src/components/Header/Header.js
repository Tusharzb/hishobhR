import React from 'react';
import { Link } from 'react-router-dom';

import './Header.style.scss';
const Header = () => {

    return (
        <div>
           <nav>
            <div className="nav-wrapper blue">
            <Link to="/" className="brand-logo">Hishobh</Link>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right menu hide-on-med-and-down">
                <li><Link to="#">History</Link></li>
              
            </ul>
            </div>
        </nav>
            <ul className="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
            </ul>
        </div>
    );
}

export default Header;
