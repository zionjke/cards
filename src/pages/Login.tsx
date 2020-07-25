import * as React from 'react';
import '.././scss/login.scss'
import Field from "../components/Field";
import Button from "../components/Button";

type Props = {

};
 const Login = (props: Props) => {
    return (
        <div className='login-form'>
            <h2>Log in</h2>
            <Field type='email' placeholder='Email address'/>
            <Field type='password' placeholder='Password'/>
            <Field type='checkbox'/>
            <Button color='blue'>LOG IN</Button>
        </div>
    );
};

 export default Login