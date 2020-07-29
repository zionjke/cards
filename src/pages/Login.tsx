import * as React from 'react';
import '.././scss/login.scss'
import Field from "../components/Field";
import Button from "../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {authMe, login, statuses} from "../redux/reducers/loginReducer";
import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {AppStateType} from "../redux/store";
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';



type Props = {

};
 const Login = React.memo((props: Props) => {

     const readCookie = () => {
         const token = Cookies.get('token');
         if(token) {
             dispatch(authMe(token))
         }
     }

     useEffect(() => {
         readCookie()
     },[])


     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [rememberMe, setRememberMe] = useState(false);
     const dispatch = useDispatch()

     const {isAuth,status,errorMessage} = useSelector((state: AppStateType) => state.login)

     const onEmailChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
         setEmail(e.currentTarget.value)
     },[])

     const onPasswordChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
         setPassword(e.currentTarget.value)
     },[])

     const onRememberMeChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
         setRememberMe(e.currentTarget.checked)
     },[])


     const onClickLogin = () => {
         dispatch(login(email,password,rememberMe))
     }

     if(isAuth) {
         return <Redirect to='/profile'/>
     }

     console.log(errorMessage)

     return (
         <div className='login-form'>
             <h2>Log in</h2>
             <Field type='text' onChange={onEmailChange} placeholder='Email address'/>
             <Field type='password' onChange={onPasswordChange} placeholder='Password'/>
             <Field type='checkbox' onChange={onRememberMeChange} />
             {
                 status === statuses.ERROR
                 && <div className='error_message'>
                     {errorMessage}
                 </div>
             }
             <Button onClick={onClickLogin} color='blue' status={status}>
                 {status === statuses.INPROGRESS ? 'LOADING...' : ' LOG IN'}
             </Button>

         </div>
     );
 });

 export default Login

