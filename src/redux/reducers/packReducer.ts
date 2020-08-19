import {actionPack, PacksActionTypes} from "../actions/packs";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {Dispatch} from "redux";
import {api} from "../../dal/api";
import Cookies from "js-cookie";
import {CardPack} from "../../types/entities";


type InitialStateType = {
    cardPacks: Array<CardPack>
    currentPage: number,
    pageCount: number,
    cardPackTotalCount: number
}

const InitialState: InitialStateType = {
    cardPacks: [],
    currentPage: 0,
    pageCount: 8,
    cardPackTotalCount: 0
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
                cardPacks: [action.pack,...state.cardPacks]
            }
        case "PACKS/REDUCER/DELETE_PACK":
            return {
                ...state,
                cardPacks: state.cardPacks.filter(pack => pack._id !== action.packId)
            }
        case "PACKS/REDUCER/UPDATE_PACK":
            return {
                ...state,
                cardPacks: state.cardPacks.map(pack => {
                    if (pack._id !== action.packId) {
                        return pack
                    } else {
                        return {
                            ...pack,
                            name: action.name
                        }
                    }
                })
            }
        case "PACKS/REDUCER/SET_PAGE":
            return {
                ...state,
                currentPage: action.page
            }
        case "PACKS/REDUCER/SET_CARDS_PACK_TOTAL_COUNT":
            return {
                ...state,
                cardPackTotalCount: action.packTotalCount
            }
    }
    return state
};

type ThunkType = ThunkAction<void, AppStateType, unknown, PacksActionTypes>

export const getPacks = (userId: string, page: number, pageCount: number): ThunkType => (dispatch: Dispatch<PacksActionTypes>) => {
    let token = Cookies.get('token')
    api.getPacks(token, userId, page, pageCount).then(r => {
        Cookies.set('token', r.data.token)
        dispatch(actionPack.setPacks(r.data.cardPacks))
        dispatch(actionPack.setPage(r.data.page))
        dispatch(actionPack.setCardPackTotalCount(r.data.cardPacksTotalCount))
    })
}

export const addPack = (name: string): ThunkType => (dispatch: Dispatch<PacksActionTypes>) => {
    let token = Cookies.get('token')
    api.addPack(token, name).then(r => {
        Cookies.set('token', r.data.token)
        dispatch(actionPack.addPack(r.data.newCardsPack))
    })
}

export const deletePack = (packId: string): ThunkType => (dispatch: Dispatch<PacksActionTypes>) => {
    let token = Cookies.get('token')
    api.deletePack(token, packId).then((r) => {
        Cookies.set('token', r.data.token)
        dispatch(actionPack.deletePack(packId))
    })
}

export const updatePack = (packId: string, name: string): ThunkType => (dispatch: Dispatch<PacksActionTypes>) => {
    let token = Cookies.get('token')
    api.updatePack(packId, name, token).then((r) => {
        Cookies.set('token', r.data.token)
        dispatch(actionPack.updatePack(packId, name))
    })
}


export default packReducer