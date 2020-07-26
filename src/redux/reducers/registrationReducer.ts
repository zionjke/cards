import {apiRegistration} from "../../api/api";
import {InferActionTypes} from "../store";
import {Dispatch} from "react";

export type InitialStateType = typeof InitialState

const InitialState = {
    reqSuccess: false,
    valueEmail: '',
    valuePassword: '',
    valuePasswordConfirm: ''
};

const registrationReducer = (state: InitialStateType = InitialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "REQUEST_SUCCESS":
            return {
                ...state,
                reqSuccess: action.payload
            }
        case "SET_VALUE_FORM":
            return {
                ...state,
                valueEmail: action.email,
                valuePassword: action.password,
                valuePasswordConfirm: action.passwordConfirm
            }
        default:
            return state
    }
};

export default registrationReducer


//actions
type ActionType = InferActionTypes<typeof actions>

export const actions = {
    requestSuccess: (payload: boolean) => ({type: 'REQUEST_SUCCESS', payload} as const),
    setValueForm: (email: string, password: string, passwordConfirm: string) =>
        ({type: 'SET_VALUE_FORM', email, password, passwordConfirm} as const)
}


//thunk
export const newRegistration = (email: string, password: string) => async (dispatch: Dispatch<ActionType>) => {
    try {
        let res = await apiRegistration.postRegistration(email, password)
        console.log(res)
        dispatch(actions.requestSuccess(res.success))
    } catch (e) {
        console.log(e)
    }

}