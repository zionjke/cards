import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {Dispatch} from "redux";
import {apiCards} from "../../dal/api";
import {action, CardsActionTypes} from "../actions/cards";
import Cookies from "js-cookie";

import {NewCardType} from "../../types/entities";


type InitialStateType = {
    cards: Array<NewCardType>
}

const InitialState = {
    cards: [],
    newQuestionTitle: '',
    newAnswerTitle: ''
};

const cardsReducer = (state: InitialStateType = InitialState, action: CardsActionTypes) => {
    switch (action.type) {
        case 'CARDS/REDUCER/ADD_NEW_CARD':
            return {
                ...state,
                cards: [...state.cards, action.newCard]
            }
        case "CARDS/REDUCER/DELETE_CARD":
            return {
                ...state,
                cards: state.cards.filter(f => f._id !== action.deletedCard._id)
            }
        case "CARDS/REDUCER/SET_VISIBLE":
            debugger
            return {
                ...state,
                cards: state.cards.map(card => {
                    if (card._id === action.id) {
                        return {
                            ...card, isVisible: action.payload
                        }
                    } else {
                        return card
                    }
                })
            }
        case 'CARDS/REDUCER/SET_CARDS':
            return {
                ...state,
                cards: action.cards.map((el) => {
                    return {...el, isVisible: false}
                })
            }
        case 'SET_RATING_CARDS':
            return {
                ...state,
                cards: state.cards.map(card => {
                    if(card._id === action.obj.card_id) {
                        return {
                            ...card,
                            grade: action.obj.grade
                        }
                    } else {
                        return card
                    }
                })
            }
        default:
            return state
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, CardsActionTypes>
//thunk
export const setRatingCards = (grade: number, id: string): ThunkType => async (dispatch: Dispatch<CardsActionTypes>) => {
    try {
        let token = Cookies.get('token')
        let res = await apiCards.setGradeCard(token, grade, id)
        Cookies.set('token', res.token)
        dispatch(action.setRating(res.updatedGrade))
    } catch (e) {
        console.log(e)
    }
}

export const getCards = (id: string): ThunkType => async (dispatch: Dispatch<CardsActionTypes>) => {
    try {
        let token = Cookies.get('token')
        let res = await apiCards.getCards(id, token)
        Cookies.set('token', res.token)
        dispatch(action.setCards(res.cards))
    } catch (e) {
        console.log(e)
    }
}

export const addNewCards = (packId: string, question: string, answer: string): ThunkType => async (dispatch: Dispatch<CardsActionTypes>) => {
    try {
        let token = Cookies.get('token')
        let res = await apiCards.addCards(packId, question, answer, token)
        Cookies.set('token', res.token)
        dispatch(action.addCards(res.newCard))
    } catch (e) {
        console.log(e)
    }
}

export const deleteCards = (id: string): ThunkType => async (dispatch: Dispatch<CardsActionTypes>) => {
    try {
        let token = Cookies.get('token')
        let res = await apiCards.deleteCards(token, id)
        Cookies.set('token', res.token)
        dispatch(action.deleteCards(res.deletedCard))
    } catch (e) {
        console.log(e)
    }
}



export default cardsReducer