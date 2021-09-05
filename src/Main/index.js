import React, {Component} from 'react';

import Landing from '../Landing';
import Client from '../Client';

class Main extends Component{

    constructor(){
        super();
        this.state = {
            isAuth: false,
        };
    }

    render(){
        return this.state.isAuth ? <Client/> : <Landing/>;
    }
}

export default Main;