import * as React from 'react';
import '.././scss/login.scss'
import Field from "../components/Field";
import Button from "../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/reducers/loginReducer";
import {ChangeEvent, useState} from 'react';
import {AppStateType} from "../redux/store";
import { useHistory } from 'react-router-dom';
import Loader from "../components/Loader";



type Props = {

};
 const Login = React.memo((props: Props) => {

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [rememberMe, setRememberMe] = useState(false);
     const dispatch = useDispatch()
     const history = useHistory()
     // @ts-ignore
     let {isLoading,isAuth} = useSelector<AppStateType>((state) => {
         return {
             isLoading: state.login.isLoading,
             isAuth:state.login.isAuth
         }
     })


     const onEmailChange = (e:ChangeEvent<HTMLInputElement>) => {
         setEmail(e.currentTarget.value)
     }

     const onPasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
         setPassword(e.currentTarget.value)
     }

     const onRememberMeChange = (e:ChangeEvent<HTMLInputElement>) => {
         setRememberMe(e.currentTarget.checked)
     }


     const onClickLogin = () => {
         dispatch(login(email,password,rememberMe))
         if(isAuth) history.push('/profile')
     }

     return (
         <div className='login-form'>
             <h2>Log in</h2>

             <Field type='text' onChange={onEmailChange} placeholder='Email address'/>
             <Field type='password' onChange={onPasswordChange} placeholder='Password'/>
             <Field type='checkbox' onChange={onRememberMeChange} />
             <Button onClick={onClickLogin} color='blue' isLoading={isLoading} >
                 LOG IN
             </Button>
             {isLoading && <Loader/>}
         </div>
     );
 });

 export default Login