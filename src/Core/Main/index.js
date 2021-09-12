import React, {Component} from 'react';

import Landing from '../../Core/Landing';
import Client from '../../Core/Client';

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