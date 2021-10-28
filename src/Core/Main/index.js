import React, {Component} from 'react';

import Landing from '../../Core/Landing';
import Client from '../../Core/Client';

class Main extends Component{

    constructor(){
        super();

        this.state = {
            user: null,
        };
    }

    render() {
        switch (this.state.user) {
            case null:
                    return <Landing/>;
            default:
                    return <Client/>;
        }
    }
}

export default Main;