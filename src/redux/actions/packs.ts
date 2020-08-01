import {InferActionTypes} from "../store";
import {CardPack} from "../../types/entities";

export const action = {
    setPacks:(packs:Array<CardPack>) =>({type:'PACKS/REDUCER/SET_PACKS',packs} as const)
}

export type PacksActionTypes = InferActionTypes<typeof action>