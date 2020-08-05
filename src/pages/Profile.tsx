import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import Cookies from "js-cookie";
import {authMe} from "../redux/reducers/loginReducer";
import {useEffect} from "react";
import { Redirect } from 'react-router-dom';


type Props = {

};
const Profile = (props: Props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMe())
    },[])


    const {email,name} = useSelector(({login}:AppStateType) => login)

    return (
        <div>
            <div>Email: {email}</div>
            <div>Name: {name}</div>
        </div>
    );
};

export default Profile