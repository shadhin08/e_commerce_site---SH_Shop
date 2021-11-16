import React from 'react';
import logo from '../../data/images/logo.jpg';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt=''></img>
            <nav>
                <a href='/shop'>Shop</a>
                <a href='/order'>Order Review</a>
                <a href='/inventory'>Manage Inventory</a>
            </nav>
        </div>
    );
};

export default Header;