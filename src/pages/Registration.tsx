// @flow
import '../scss/registration.scss';
import * as React from 'react';
import {ChangeEvent, useCallback, useState} from "react";
import Field from "../components/Field";
import Button from "../components/Button";
import {actions, newRegistration} from "../redux/reducers/registrationReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import { Redirect } from 'react-router-dom';


type PropsType = {};

export const Registration = (props: PropsType) => {

        const state = useSelector((state: AppStateType) => {
            return {
                reqSuccess: state.registration.reqSuccess
            }
        })
        const dispatch = useDispatch();
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [passwordConfirm, setPasswordConfirm] = useState('')

        const onChangeLogin = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            debugger
            setEmail(e.currentTarget.value)
        }, [email])

        const onChangePassword = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value)
        }, [password])

        const onChangePasswordConfirm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setPasswordConfirm(e.currentTarget.value)
        }, [passwordConfirm])

        const onClickSubmit = () => {
            dispatch(actions.setValueForm(email, password, passwordConfirm))
            dispatch(newRegistration(email, password))
        }

        if(state.reqSuccess) {
        return <Redirect to='/profile'/>
        }

        let error = password.length < 8 ? true : false;
        let Error = password !== passwordConfirm ? true : false
        let disabled = error || Error ? true : false

        return (
            <div className='registration_block'>
                <h1>Welcome</h1>
                <Field type={'email'} onChange={onChangeLogin} placeholder={'Email'}/>
                <Field type={'password'} error={error} onChange={onChangePassword} placeholder={'Password'}/>
                {error
                    ? <div className='error_password'>password must be at least 8 symbols</div>
                    : ''
                }
                <Field type={'password'} onChange={onChangePasswordConfirm} placeholder={'Confirm password'}/>
                {Error
                    ? <div className='error_password'>Password mismatch</div>
                    : ''
                }
                <Button disabled={disabled} onClick={onClickSubmit} color={'green'}>Confirm</Button>
            </div>
        );
    }

