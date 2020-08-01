// @flow
import * as React from 'react';
import {useEffect} from "react";
import {getPacks} from "../redux/reducers/packReducer";
import Cookies from "js-cookie";
import {authMe} from "../redux/reducers/loginReducer";
import {useDispatch} from "react-redux";

type Props = {

};
const Packs = (props: Props) => {
    const dispatch = useDispatch()
    const readCookie = () => {
        const token = Cookies.get('token');
        if(token) {
            dispatch(authMe(token))
        }
    }

    useEffect(() => {
        readCookie()
        dispatch(getPacks())
    })

    return (
        <div>

        </div>
    );
};

export default Packs