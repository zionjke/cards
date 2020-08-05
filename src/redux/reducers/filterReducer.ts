import {FilterActionTypes} from "../actions/filter";

type InitialStateType = typeof InitialState

const InitialState = {
    search: ""
}

const filterReducer = (state:InitialStateType=InitialState,action:FilterActionTypes):InitialStateType => {
    switch (action.type) {
        case "FILTER/REDUCER/SET_SEARCH_QUERY":
            return {
                ...state,
                search: action.query
            }
    }
    return state
}

export default filterReducer