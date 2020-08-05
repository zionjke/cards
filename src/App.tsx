import React, {useEffect} from 'react';
import './scss/App.scss';
import Header from "./components/Header";
import Profile from "./pages/Profile";
import { Route, Switch } from 'react-router-dom';
import Login from "./pages/Login";
import {Registration} from "./pages/Registration";
import Packs from "./pages/Packs";
import Cards from "./pages/Cards";
import {useDispatch} from "react-redux";
import {authMe} from "./redux/reducers/loginReducer";


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMe())
    })

  return (
    <div className="App">
        <Header/>
        <div className='wrapper'>
            <Switch>
                <Route exact path={'/profile'} render={() => <Profile/>}/>
                <Route exact path={'/login'} render={() => <Login/>}/>
                <Route exact path={'/registration'} render={() => <Registration/>}/>
                <Route path={'/packs'} render={() => <Packs/>}/>
                <Route path={'/card/:id'} render={() => <Cards/>}/>
            </Switch>
        </div>
    </div>
  );
};

export default App;
