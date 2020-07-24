import React from 'react';
import  './../scss/header.scss'
import { NavLink } from 'react-router-dom';

type Props = {

};
const Header = (props: Props) => {
    return (
        <div className='header_block'>
            <NavLink to={'/profile'}>
                Profile
            </NavLink>
            <NavLink to={'/login'}>
                Login
            </NavLink>
            <NavLink to={'/registration'}>
                Registration
            </NavLink>
        </div>
    );
};

export default Header