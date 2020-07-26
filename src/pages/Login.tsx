import * as React from 'react';
import '.././scss/login.scss'
import Field from "../components/Field";
import Button from "../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/reducers/loginReducer";
import {ChangeEvent, useCallback, useState} from 'react';
import {AppStateType} from "../redux/store";
import { useHistory, Redirect } from 'react-router-dom';


type Props = {

};
 const Login = React.memo((props: Props) => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [rememberMe, setRememberMe] = useState(false);
     const dispatch = useDispatch()

     const {isLoading,isAuth} = useSelector((state: AppStateType) => state.login)

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

     return (
         <div className='login-form'>
             <h2>Log in</h2>
             <Field type='text' onChange={onEmailChange} placeholder='Email address'/>
             <Field type='password' onChange={onPasswordChange} placeholder='Password'/>
             <Field type='checkbox' onChange={onRememberMeChange} />
             <Button onClick={onClickLogin} color='blue' isLoading={isLoading} >
                 {isLoading ? 'LOADING...' : ' LOG IN'}
             </Button>
         </div>
     );
 });

 export default Login