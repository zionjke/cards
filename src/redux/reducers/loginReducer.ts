import {action, LoginActionTypes} from "../actions/login";
import {AppStateType} from "../store";
import {ThunkAction} from "redux-thunk";
import {api} from "../../dal/api";
import Cookies from 'js-cookie'
import {Dispatch} from "redux";

export const statuses = {
    INIT: 'INIT',
    ERROR: 'ERROR',
    INPROGRESS: 'INPROGRESS',
    SUCCESS: 'SUCCESS'
};

type InitialStateType = typeof InitialState

const InitialState = {
    isAuth:false,
    email: '',
    name: '',
    isAdmin: false,
    errorMessage: '',
    status:statuses.INIT
};



const loginReducer = (state: InitialStateType = InitialState, action: LoginActionTypes): InitialStateType => {
    switch (action.type) {
        case "LOGIN/REDUCER/SET_USER_DATA":
            return {
                ...state,
                ...action.data,
            }
        case "LOGIN/REDUCER/SET_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: action.error
            }
        case "LOGIN/REDUCER/SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "LOGIN/REDUCER/SET_AUTH":
            return {
                ...state,
                isAuth: action.auth
            }
    }
    return state
};

type ThunkType = ThunkAction<void, AppStateType, unknown, LoginActionTypes>

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch(action.setStatus(statuses.INPROGRESS))
    api.login(email, password, rememberMe)
        .then(r => {
            Cookies.set('token',r.data.token)
            const token = Cookies.get('token')
            // @ts-ignore
            dispatch(authMe(token))
            dispatch(action.setStatus(statuses.SUCCESS))
        })
        .catch(e => {
            dispatch(action.setStatus(statuses.ERROR))
            dispatch(action.setErrorMessage(e.response.data.error))
        })

}

export const authMe = (token:string):ThunkType => (dispatch:Dispatch<LoginActionTypes>) => {
    api.me(token).then((r) => {
        let {email, name, isAdmin,  token} = r.data
        Cookies.set('token',token)
        dispatch(action.setUserData(email, name, isAdmin))
        dispatch(action.setIsAuth(true))
    })
}

export const logOut = ():ThunkType => (dispatch:Dispatch<LoginActionTypes>) => {
    Cookies.remove('token')
    dispatch(action.setIsAuth(false))
}



export default loginReducer