// @flow
import '../scss/registration.scss';
import * as React from 'react';
import {ChangeEvent, useCallback, useState} from "react";
import Field from "../components/Field";
import Button from "../components/Button";
import {actions, newRegistration} from "../redux/reducers/registrationReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";


type PropsType = {};

export const Registration = React.memo((props: PropsType) => {

        const state = useSelector((state: AppStateType) => {
            return {
                valueEmail: state.registration.valueEmail,
                valuePassword: state.registration.valuePassword,
                valuePasswordConfirm: state.registration.valuePasswordConfirm,
                reqSuccess: state.registration.reqSuccess
            }
        })

        const dispatch = useDispatch();
        const [email, setEmail] = useState(state.valueEmail)
        const [password, setPassword] = useState(state.valuePassword)
        const [passwordConfirm, setPasswordConfirm] = useState(state.valuePassword)


        const onChangeLogin = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.currentTarget.value)
        }, [])

        const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value)
        }, [])

        const onChangePasswordConfirm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setPasswordConfirm(e.currentTarget.value)
        }, [])

        const onClickSubmit = useCallback(() => {
            dispatch(newRegistration(email, password))
            dispatch(actions.setValueForm(email, password, passwordConfirm))
        }, [])

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
                <Button disabled={disabled} onClickFunc={onClickSubmit} color={'green'}>Confirm</Button>
            </div>
        );
    }
)
