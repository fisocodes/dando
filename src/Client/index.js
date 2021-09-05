import React, { Component } from 'react';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class Client extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: history.location.hash === "" ? "#/home" : history.location.hash,
        };
        console.log(history.location);
    }

    componentDidMount(){
        history.listen(this.routeChanged);
    }

    routeChanged = () => {
        this.setState({
            value: history.location.hash === "" ? "#/home" : history.location.hash,
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
                    <Tab value="#/home" label="Home" component={Link} to='/home'/>
                    <Tab value="#/user" label="User" component={Link} to='/user'/>
                    <Tab value="#/statistics" label="Statistics" component={Link} to='/statistics'/>    
                </Tabs>
                <Switch>
                    <Route path='/home'>
                        <h1>Home</h1>
                    </Route>
                    <Route path='/user'>
                        <h1>User</h1>
                    </Route>
                    <Route path='/statistics'>
                        <h1>Statistics</h1>
                    </Route>
                    <Route path='/'>
                    <Redirect to='/home'/>
                    </Route>
              </Switch>
            </React.Fragment>
        );
    }
}

export default Client;