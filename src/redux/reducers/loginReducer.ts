type InitialStateType = {
    email:string
    name:string
    isAdmin:boolean
    rememberMe:boolean
    isLoading: boolean
}

const initialState:InitialStateType = {
    isLoading:false,
    email:'',
    name:'',
    isAdmin:false,
    rememberMe:false
};

const loginReducer = (state:InitialStateType,action:any):InitialStateType => {
    return state
};

export default loginReducer