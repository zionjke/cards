import {InferActionTypes} from "../store";

export const action = {
    setUserData:(email:string,name:string,isAdmin:boolean,_id:string) =>({type: 'LOGIN/REDUCER/SET_USER_DATA', data:{email,name,isAdmin,_id}} as const),
    setErrorMessage:(error:string) =>({type: 'LOGIN/REDUCER/SET_ERROR_MESSAGE', error} as const),
    setStatus:(status:string) =>({type: 'LOGIN/REDUCER/SET_STATUS', status} as const),
    setIsAuth:(auth:boolean) =>({type: 'LOGIN/REDUCER/SET_AUTH', auth} as const),
}

export type LoginActionTypes = InferActionTypes<typeof action>