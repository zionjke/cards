import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import loginReducer from "./reducers/loginReducer";
import registrationReducer from "./reducers/registrationReducer";
import newPwReducer from "./reducers/newPwReducer";
import profileReducer from "./reducers/profileReducer";
import recoverPwReducer from "./reducers/recoverPwReducer";
import packReducer from "./reducers/packReducer";
import cardsReducer from "./reducers/cardsReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    newPassword: newPwReducer,
    profile:profileReducer,
    recoverPassword:recoverPwReducer,
    packs: packReducer,
    cards: cardsReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store