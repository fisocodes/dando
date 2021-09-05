import React, { Component } from 'react';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { createBrowserHistory } from 'history';

import Overview from '../Overview';
import Login from '../Login';
import Signup from '../Signup';

const history = createBrowserHistory();

class Landing extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: history.location.hash === "" ? "#/overview" : history.location.hash,
        };
        console.log(history.location);
    }

    componentDidMount(){
        history.listen(this.routeChanged);
    }

    routeChanged = () => {
        this.setState({
            value: history.location.hash === "" ? "#/overview" : history.location.hash,
        });
    }
    
    setValue = (event, newValue) => {
        console.log(newValue);
        this.setState({
            value: newValue,
        });
    }

    render() {
        return(
            <React.Fragment>
                <Tabs value={this.state.value} onChange={this.setValue} centered>        
                    <Tab value="#/overview" label="Overview" component={Link} to='/overview'/>
                    <Tab value="#/log-in" label="Log In" component={Link} to='/log-in'/>
                    <Tab value="#/sign-up" label="Sign Up" component={Link} to='/sign-up'/>    
                </Tabs>
                <Switch>
                    <Route path='/overview'>
                        <Overview/>
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
}

export default Landing;