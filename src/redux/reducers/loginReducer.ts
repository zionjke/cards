import {action, LoginActionTypes} from "../actions/login";
import {AppStateType} from "../store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {api} from "../../dal/api";


type InitialStateType = {
    isAuth:boolean
    email: string
    name: string
    isAdmin: boolean
    rememberMe: boolean
    isLoading: boolean
    errorMessage: string
}

const initialState: InitialStateType = {
    isLoading: false,
    isAuth:false,
    email: '',
    name: '',
    isAdmin: false,
    rememberMe: false,
    errorMessage: ''
};

const loginReducer = (state: InitialStateType = initialState, action: LoginActionTypes): InitialStateType => {
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
        case "LOGIN/REDUCER/SET_IS_LOADING":
            return {
                ...state,
                isLoading: action.loading
            }
    }
    return state
};

type ThunkType = ThunkAction<void, AppStateType, unknown, LoginActionTypes>

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, LoginActionTypes>) => {
    dispatch(action.setLoading(true))
    api.login(email, password, rememberMe)

        .then(r => {
            let {email, name, isAdmin, rememberMe, token} = r.data
            dispatch(action.setUserData(email, name, isAdmin, rememberMe,true))
            localStorage.setItem('token', token)
            dispatch(action.setLoading(false))
        })

        .catch(e => {
            dispatch(action.setErrorMessage(e))
        })

        .finally(()=> {
            dispatch(action.setLoading(false))
        })
}

export default loginReducer