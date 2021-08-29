import React, {Component} from 'react';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';

import Landing from '../Landing';
import Login from '../Login';
import Signup from '../Signup';

class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            auth: false,
            value: props.history.location.hash === "" ? "#/overview" : props.history.location.hash,
        };
        console.log(props.history.location);
    }

    componentDidMount(){
        this.props.history.listen(this.routeChanged);
    }

    routeChanged = () => {
        this.setState({
            value: this.props.history.location.hash === "" ? "#/overview" : this.props.history.location.hash,
        });
    }
    
    setValue = (event, newValue) => {
        console.log(newValue);
        this.setState({
            value: newValue,
        });
    }

    render(){
        if(!this.state.auth){
            return(
                <React.Fragment>
                    <Tabs value={this.state.value} onChange={this.setValue} centered>        
                        <Tab value="#/overview" label="Overview" component={Link} to='/overview'/>
                        <Tab value="#/log-in" label="Log In" component={Link} to='/log-in'/>
                        <Tab value="#/sign-up" label="Sign Up" component={Link} to='/sign-up'/>    
                    </Tabs>
                    <Switch>
                        <Route path='/overview'>
                            <Landing/>
                        </Route>
                        <Route path='/log-in'>
                            <Login/>
                        </Route>
                        <Route path='/sign-up'>
                            <Signup/>
                        </Route>
                        <Route path='/'>
                            <Redirect to='/overview'/>
                        </Route>
                    </Switch>
                </React.Fragment>  
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