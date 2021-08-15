import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Landing from '../Landing';

class Main extends Component{

    constructor(){
        super();
        this.state = {
            auth: false,
        };
    }
    

    render(){
        if(!this.state.auth){
            return(
                <Landing/>   
            );
        }
        else{
            return(
              <Switch>
                  <Route path='/user'>
                      <h1>User</h1>
                  </Route>
                  <Route path='/statistics'>
                      <h1>Statistics</h1>
                  </Route>
                  <Route path='/'>
                      <h1>Home</h1>
                  </Route>
              </Switch>
            );
        }
    }
}

export default Main;