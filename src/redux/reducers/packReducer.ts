import {action, PacksActionTypes} from "../actions/packs";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {Dispatch} from "redux";
import {api} from "../../dal/api";
import Cookies from "js-cookie";


type InitialStateType = typeof InitialState

const InitialState = {
    packs: []
};

const packReducer = (state: InitialStateType = InitialState, action: PacksActionTypes) => {
    switch (action.type) {
        case "PACKS/REDUCER/SET_PACKS":
            return {
                ...state,
                packs: action.packs
            }
    }
    return state
};

type ThunkType = ThunkAction<void, AppStateType, unknown, PacksActionTypes>

export const getPacks = (): ThunkType => (dispatch: Dispatch<PacksActionTypes>) => {
    let token = Cookies.get('token')
    api.getPacks(token).then(r => {
        dispatch(action.setPacks(r.data.cardPacks))
        Cookies.set('token',r.data.token)
    })
}

export default packReducer