import React, {useState} from 'react';
import './../scss/header.scss'
import {NavLink, useHistory} from 'react-router-dom';
import Button from "./Button";
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../redux/reducers/loginReducer";
import {AppStateType} from "../redux/store";
import logo from '../assets/logo.png';


type Props = {};
const Header = (props: Props) => {
    const [isHidden, setIsHidden] = useState(true)

    const dispatch = useDispatch()
    const history = useHistory()
    const {isAuth} = useSelector(({login}: AppStateType) => login)

    const handleClick = () => {
        setIsHidden(!isHidden);
    }

    const onClickLogout = () => {
        dispatch(logOut())
        history.push('/login')
    }

    return (
        <div className='header_block'>
            <div className='header_items'>
                <div className='header_item dropdown'>
                    <i className='material-icons' title={'settings'}>settings</i>
                    <div className='dropdown_content'>
                        <NavLink to={'/login'}>
                            <div>Sing in</div>
                        </NavLink>
                        <NavLink to={'/registration'}>
                            <div>Registration</div>
                        </NavLink>
                        <NavLink to={'/profile'}>
                            <div>My profile</div>
                        </NavLink>
                        <NavLink to={'/packs'}>
                            <div>My packs</div>
                        </NavLink>
                    </div>

                </div>
                <div className='header_item dropdown'>
                    <i className='material-icons' title={'person'} onClick={handleClick}>person</i>
                    <div className='dropdown_content'>
                        <NavLink to={'/login'}>
                            <div>Sing in</div>
                        </NavLink>
                        <NavLink to={'/registration'}>
                            <div>Registration</div>
                        </NavLink>
                        <NavLink to={'/profile'}>
                            <div>My profile</div>
                        </NavLink>
                        <NavLink to={'/packs'}>
                            <div>My packs</div>
                        </NavLink>
                        <NavLink to={'/login'}><div onClick={onClickLogout}>Log out</div></NavLink>
                    </div>

                </div>
            </div>

            <img src={logo}/>

        </div>
    );
};

export default Header

// {/*{!isAuth &&*/}
// {/*<div>*/}
// {/*    <NavLink to={'/login'}>*/}
// {/*        Login*/}
// {/*    </NavLink>*/}
// {/*    <NavLink to={'/registration'}>*/}
// {/*        Registration*/}
// {/*    </NavLink>*/}
// {/*</div>*/}
// {/*}*/}
// {/*{isAuth &&*/}
// {/*<div>*/}
// {/*    <NavLink to={'/profile'}>*/}
// {/*        Profile*/}
// {/*    </NavLink>*/}
// {/*    <NavLink to={'/packs'}>*/}
// {/*        Packs*/}
// {/*    </NavLink>*/}
// {/*    <Button onClick={onClickLogout} color='red'>*/}
// {/*        Log out*/}
// {/*    </Button>*/}
// {/*</div>*/}
// {/*}*/}
