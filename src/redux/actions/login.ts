import {InferActionTypes} from "../store";

export const action = {
    setUserData:(email:string,name:string,isAdmin:boolean,rememberMe:boolean) =>({type: 'LOGIN/REDUCER/SET_USER_DATA', data:{email,name,isAdmin,rememberMe}} as const),
    setLoading:(loading:boolean) =>({type: 'LOGIN/REDUCER/SET_IS_LOADING', loading} as const),
    setErrorMessage:(error:string) =>({type: 'LOGIN/REDUCER/SET_IS_LOADING', error} as const),
}

export type LoginActionTypes = InferActionTypes<typeof action>