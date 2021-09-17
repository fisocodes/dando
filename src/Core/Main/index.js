import React, {Component} from 'react';

import Landing from '../../Core/Landing';
import Client from '../../Core/Client';

import Axios from '../Axios';

class Main extends Component{

    constructor(){
        super();

        this.state = {
            username: 'fisocodes',
            password: 'sotooscar1',
            user: null,
        };

        Axios.post('/users/authenticate', {
            username: this.state.username === '' ? null : this.state.username,
            password: this.state.password === '' ? null : this.state.password,
        }, {withCredentials: true})
        .then((response) => {
            console.log(response);
        })
        .catch((error) =>{
            console.log(error);
        });

    }

    render(){
        return this.state.user === null ? <Landing/> : <Client/>;
    }
}

export default Main;