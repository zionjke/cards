import {InferActionTypes} from "../store";

export const action = {
    setUserData:(email:string,name:string,isAdmin:boolean,rememberMe:boolean) =>({type: 'LOGIN/REDUCER/SET_USER_DATA', email,name,isAdmin,rememberMe} as const)
}

type ActionTypes = InferActionTypes<typeof action>