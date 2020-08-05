import {InferActionTypes} from "../store";
import {NewCardType} from "../../types/entities";

export const action = {
    setCards: (cards: Array<NewCardType>) => ({type: 'CARDS/REDUCER/SET_CARDS', cards} as const),
    addCards: (newCard: NewCardType) => ({type: 'CARDS/REDUCER/ADD_NEW_CARD', newCard} as const),
    deleteCards: (deletedCard: NewCardType) => ({type: 'CARDS/REDUCER/DELETE_CARD', deletedCard} as const),
    setVisible: (payload: boolean, id: string) => ({type: 'CARDS/REDUCER/SET_VISIBLE', payload, id} as const),
}

export type CardsActionTypes = InferActionTypes<typeof action>