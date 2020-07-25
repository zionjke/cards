import axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
});

type LoginResponseType = {
    email:string
    name:string
    isAdmin:boolean
    rememberMy:boolean
    token:string
    tokenDeathTime:number
    __v:number
    _id:string
    success:boolean
}

export const api = {
    login(email:string,password:string,rememberMe:boolean) {
        instanse.post<LoginResponseType>('auth/login',{email,password,rememberMe})
    }
}

