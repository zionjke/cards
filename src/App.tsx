import React, {useEffect} from 'react';
import './scss/App.scss';
import Header from "./components/Header";
import Profile from "./pages/Profile";
import { Route } from 'react-router-dom';
import Login from "./pages/Login";
import {Registration} from "./pages/Registration";
import Packs from "./pages/Packs";

const App = () => {


  return (
    <div className="App">
        <Header/>
        <div className='wrapper'>
            <Route exact path={'/profile'} render={() => <Profile/>}/>
            <Route exact path={'/login'} render={() => <Login/>}/>
            <Route exact path={'/registration'} render={() => <Registration/>}/>
            <Route path={'/packs'} render={() => <Packs/>}/>
        </div>
    </div>
  );
};

export default App;
