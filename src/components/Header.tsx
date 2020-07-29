import React from 'react';
import  './../scss/header.scss'
import { NavLink, useHistory } from 'react-router-dom';
import Button from "./Button";
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../redux/reducers/loginReducer";
import {AppStateType} from "../redux/store";

type Props = {

};
const Header = (props: Props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {isAuth} = useSelector(({login}:AppStateType) => login)

    const onClickLogout = () => {
        dispatch(logOut())
        history.push('/login')
    }

    return (
        <div className='header_block'>
            <NavLink to={'/profile'}>
                Profile
            </NavLink>
            {!isAuth && <NavLink to={'/login'}>
                Login
            </NavLink>}
            {!isAuth && <NavLink to={'/registration'}>
                Registration
            </NavLink>}
            {isAuth && <Button onClick={onClickLogout} color='red'>
                Log out
            </Button>}

        </div>
    );
};

export default Header