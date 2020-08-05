import {InferActionTypes} from "../store";
import {CardPack} from "../../types/entities";

export const action = {
    setPacks: (packs: Array<CardPack>) => ({type: 'PACKS/REDUCER/SET_PACKS', packs} as const),
    addPack: (pack: CardPack) => ({type: 'PACKS/REDUCER/ADD_PACK', pack} as const),
    deletePack: (packId: string) => ({type: 'PACKS/REDUCER/DELETE_PACK', packId} as const),
    updatePack: (packId: string,name:string) => ({type: 'PACKS/REDUCER/UPDATE_PACK', packId,name} as const)
}

export type PacksActionTypes = InferActionTypes<typeof action>