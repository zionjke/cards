import {InferActionTypes} from "../store";

export const actionFilter = {
    setSearchQuery:(query:string)=>({type:'FILTER/REDUCER/SET_SEARCH_QUERY',query} as const)
}

export type FilterActionTypes = InferActionTypes<typeof actionFilter>