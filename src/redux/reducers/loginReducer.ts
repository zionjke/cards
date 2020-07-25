import {action, LoginActionTypes} from "../actions/login";
import {AppStateType} from "../store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {api} from "../../dal/api";

type InitialStateType = {
    email: string
    name: string
    isAdmin: boolean
    rememberMe: boolean
    isLoading: boolean
    errorMessage:string
}

const initialState: InitialStateType = {
    isLoading: false,
    email: '',
    name: '',
    isAdmin: false,
    rememberMe: false,
    errorMessage:''
};

const loginReducer = (state: InitialStateType=initialState, action: LoginActionTypes): InitialStateType => {
    switch (action.type) {
        case "LOGIN/REDUCER/SET_USER_DATA":
            return {
                ...state,
                ...action.data,
            }
    }
    return state
};

type ThunkType = ThunkAction<void, AppStateType, unknown, LoginActionTypes>

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, LoginActionTypes>) => {
    api.login(email,password,rememberMe)
        .then(r => {
        const {email,name,isAdmin,rememberMe} = r.data
        dispatch(action.setUserData(email,name,isAdmin,rememberMe))
        localStorage.setItem('token',r.data.token)})
        .catch(e => {
            dispatch(action.setErrorMessage(e))
        })
}

export default loginReducer