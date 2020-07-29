import axios from 'axios';


const instanse = axios.create({
    baseURL: 'http://localhost:7542/1.0/'
});

type LoginResponseType = {
    email:string
    name:string
    isAdmin:boolean
    rememberMe:boolean
    token:string
    tokenDeathTime:number
    __v:number
    _id:string
    success:boolean
}

export const api = {
    login(email:string,password:string,rememberMe:boolean) {
       return  instanse.post<LoginResponseType>('auth/login', {email, password, rememberMe},)
    },
    me(token:string) {
        return instanse.post<LoginResponseType>('auth/me', {token})
    }
}

