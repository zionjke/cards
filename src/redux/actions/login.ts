import {InferActionTypes} from "../store";

export const action = {
    setUserData:(email:string,name:string,isAdmin:boolean,rememberMe:boolean,isAuth:boolean) =>({type: 'LOGIN/REDUCER/SET_USER_DATA', data:{email,name,isAdmin,rememberMe,isAuth}} as const),
    setLoading:(loading:boolean) =>({type: 'LOGIN/REDUCER/SET_IS_LOADING', loading} as const),
    setErrorMessage:(error:string) =>({type: 'LOGIN/REDUCER/SET_ERROR_MESSAGE', error} as const),
}

export type LoginActionTypes = InferActionTypes<typeof action>