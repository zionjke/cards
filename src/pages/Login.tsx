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
import GoogleLogin from "react-google-login";



type Props = {

};
 const Login = React.memo((props: Props) => {


     const validate = () => {
         if (!email.includes('@')) {
             let emailError = 'Incorrect email';
             setEmailError(emailError)
         }
         if(password.length < 8) {
             let passwordError = 'Password must be more than 7 characters...'
             setPasswordError(passwordError)
         }
     }

     useEffect(() => {
         dispatch(authMe())
     },[])

     const dispatch = useDispatch()
     const [email, setEmail] = useState('');
     const [emailError, setEmailError] = useState('');
     const [passwordError, setPasswordError] = useState('');
     const [password, setPassword] = useState('');
     const [rememberMe, setRememberMe] = useState(false);


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
         validate()
         dispatch(login(email,password,rememberMe))
     }

     const responseGoogle = (response:any) => {
        console.log(response)
        console.log(response.profileObj)
     }

     if(isAuth) {
         return <Redirect to='/profile'/>
     }

     return (
         <div className='login-form'>
             <h2>Log in</h2>
             <Field type='email'
                    onChange={onEmailChange}
                    placeholder='Email address'/>
                    <span className='error_message'>{emailError}</span>
             <Field type='password'
                    onChange={onPasswordChange}
                    placeholder='Password'/>
                    <span className='error_message'>{passwordError}</span>
             <div>
                 <Field type='checkbox'
                        onChange={onRememberMeChange} />
                        <span> Remember</span>
             </div>

             {
                 status === statuses.ERROR
                 && <div className='error_message'>
                     {errorMessage}
                 </div>
             }
             <Button onClick={onClickLogin} color='blue' status={status}>
                 {status === statuses.INPROGRESS ? 'LOADING...' : ' LOG IN'}
             </Button>
             <span>OR</span>
             <div className='login-form_google-auth'>
                 <GoogleLogin
                     clientId='567755172781-bjt348j3gbpdplvmnis0ri45eqi0l3o1.apps.googleusercontent.com'
                     buttonText='Login'
                     onSuccess={responseGoogle}
                     onFailure={responseGoogle}
                     cookiePolicy={'single_host_origin'}
                 />
             </div>
         </div>
     );
 });

 export default Login

