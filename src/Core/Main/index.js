import React, {Component} from 'react';

import Landing from '../../Core/Landing';
import Client from '../../Core/Client';
import Axios from '../Axios';
import Loading from '../../Pages/Loading';
import store from '../Redux/Store';

class Main extends Component{

    constructor(){
        super();

        this.state = {
            user: 0,
        };
    }

    setStateFromStore = () => {
        this.setState({
            user: store.getState().user,
        });
    }

    componentDidMount(){
        store.subscribe(this.setStateFromStore);
        Axios.post('/users/authenticate', {username: '', password: ''}, {withCredentials: true})
        .then((response) => {
            store.dispatch({type: 'modal/setMessage', payload: response.data.message});
            store.dispatch({type: 'user/setUser', payload: response.data.user});
        })
        .catch((error) =>{
            store.dispatch({type: 'user/setNull'});
        });
    }

    render() {
        switch (this.state.user) {
            case null:
                    return <Landing/>;
            case 0:
                    return <Loading/>;
            default:
                    return <Client/>;
        }
    }

}

export default Main;