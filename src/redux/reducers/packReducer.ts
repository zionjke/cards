import {action, PacksActionTypes} from "../actions/packs";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {Dispatch} from "redux";
import {api} from "../../dal/api";
import Cookies from "js-cookie";
import {CardPack} from "../../types/entities";


type InitialStateType = {
    cardPacks: Array<CardPack>
}

const InitialState = {
    cardPacks: []
};

const packReducer = (state: InitialStateType = InitialState, action: PacksActionTypes): InitialStateType => {
    switch (action.type) {
        case "PACKS/REDUCER/SET_PACKS":
            return {
                ...state,
                cardPacks: action.packs
            }
        case "PACKS/REDUCER/ADD_PACK":
            return {
                ...state,
                cardPacks: [...state.cardPacks, action.pack]
            }
        case "PACKS/REDUCER/DELETE_PACK":
            return {
                ...state,
                cardPacks: state.cardPacks.filter(pack => pack._id !== action.packId)
            }
    }
    return state
};

type ThunkType = ThunkAction<void, AppStateType, unknown, PacksActionTypes>

export const getPacks = (userId:string): ThunkType => (dispatch: Dispatch<PacksActionTypes>) => {
    let token = Cookies.get('token')
    api.getPacks(token,userId).then(r => {
        Cookies.set('token', r.data.token)
        dispatch(action.setPacks(r.data.cardPacks))
    })
}

export const addPack = (name:string): ThunkType => (dispatch: Dispatch<PacksActionTypes>) => {
    let token = Cookies.get('token')
    api.addPack(token,name).then(r => {
        Cookies.set('token', r.data.token)
        dispatch(action.addPack(r.data.newCardsPack))
    })
}

export const deletePack = (packId: string): ThunkType => (dispatch: Dispatch<PacksActionTypes>) => {
    let token = Cookies.get('token')
    api.deletePack(token, packId).then((r) => {
        Cookies.set('token', r.data.token)
        dispatch(action.deletePack(packId))
    })
}

export default packReducer