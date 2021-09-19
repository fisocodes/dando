import React, { Component } from 'react';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { createBrowserHistory } from 'history';

import Overview from '../../Pages/Overview';
import Login from '../../Pages/Login';
import Signup from '../../Pages/Signup';

const history = createBrowserHistory();

class Landing extends Component {

    constructor(props){
        super(props);
        this.state = {
            isMounted: false,
            value: history.location.hash === "" ? "#/overview" : history.location.hash,
        };
    }

    componentDidMount(){
        this.setState({isMounted: true});

        if(this.state.isMounted){
            history.listen(this.routeChanged);
        }
    }

    componentWillUnmount(){
        this.setState({isMounted: false});
    }

    routeChanged = () => {
        if(this.state.isMounted){
            this.setState({
                value: history.location.hash === "" ? "#/overview" : history.location.hash,
            });
        }
    }
    
    setValue = (event, newValue) => {
        if(this.state.isMounted){
            this.setState({
                value: newValue,
            });
        }
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