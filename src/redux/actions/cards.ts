import {InferActionTypes} from "../store";

export const action = {
    setCards: (cards: any) => ({type: 'CARDS/REDUCER/SET_CARDS', cards} as const)
}

export type CardsActionTypes = InferActionTypes<typeof action>