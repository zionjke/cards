import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {Dispatch} from "redux";
import {apiCards} from "../../api/api";
import {action, CardsActionTypes} from "../actions/cards";


type InitialStateType = typeof InitialState

const InitialState = {
    cards: [],
    newQuestionTitle: '',
    newAnswerTitle: ''
};

const cardsReducer = (state: InitialStateType = InitialState, action: CardsActionTypes) => {
    switch (action.type) {
        case 'CARDS/REDUCER/SET_CARDS':
            return {
                ...state,
                cards: action.cards.cards
            }


        default:
            return state
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, CardsActionTypes>


//thunk
export const getCards = (id: string): ThunkType => async (dispatch: Dispatch<CardsActionTypes>) => {
    try {
        let token = localStorage.getItem('token')
        let res = await apiCards.getCards(id, token)
        localStorage.setItem('token', res.token)
        dispatch(action.setCards(res))
    } catch (e) {
        console.log(e)
    }
}

export const addNewCards = (packId: string, question: string, answer: string) => async (dispatch: Dispatch<CardsActionTypes>) => {
    try {
        debugger
        let card = {cardsPack_id: packId, question, answer}
        let token = localStorage.getItem('token')
        let res = await apiCards.addCards({card}, token)
        localStorage.setItem('token', res.token)
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

export const deleteCards = (id: string) => async (dispatch: Dispatch<CardsActionTypes>) => {
    try {
        let token = localStorage.getItem('token')
        let res = await apiCards.deleteCards(token, id)
        localStorage.setItem('token', res.token)
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}


export default cardsReducer