import React from 'react';
import {Link} from 'react-router-dom'
const Nav=()=>{
    return <nav className=" navbar navbar-expand-lg navbar-light text-black bg-warning col-12 ">
        <ul className="navbar-nav">
        <li className="nav-item"><Link className="nav-link" to='/'>Home</Link> </li>
        <li className="nav-item"><Link className="nav-link" to='/About'>About</Link> </li>
        <li className="nav-item"><Link className="nav-link" to='/Register'>Register</Link> </li>
        </ul>

    </nav>
};

export default Nav;