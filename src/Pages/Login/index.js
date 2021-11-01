import React, {Component} from 'react';
import { TextField, Button } from '@material-ui/core';
import Typist from 'react-typist';
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { CircularProgress} from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';
import { Redirect } from 'react-router';

import Axios from '../../Core/Axios';
import store from '../../Core/Redux/Store';

import './index.css';

class Login extends Component
{
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            isCreateDialogOpen: false,
            dialogTitle: "Signing In",
            dialogContent: <CircularProgress color="secondary"/>,
            dialogActions: null,
            isRedirect: false,
            isError: false,
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value, 
        });
    }

    handleOnClose = (event) => {
        this.setState({
            isCreateDialogOpen: false,
            isRedirect: this.state.isError ? false : true,
            dialogTitle: "Signing In",
            dialogContent: <CircularProgress color="secondary"/>,
            dialogActions: null,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            isCreateDialogOpen: true,
        });

        Axios.post('/users/authenticate', {
            username: this.state.username === '' ? null : this.state.username,
            password: this.state.password === '' ? null : this.state.password,
        }, {withCredentials: true})
        .then((response) => {
            
            this.setState({
                dialogTitle: response.data.message,
                dialogContent: <CheckCircle color="secondary" fontSize="large"/>,
                dialogActions: <Button variant="contained" color="primary" onClick={this.handleOnClose}>Noice</Button>,
                isError: false,
            });

            store.dispatch({type: 'modal/setMessage', payload: response.data.message});
            store.dispatch({type: 'user/setUser', payload: response.data.user});
        })
        .catch((error) =>{
            this.setState({
                dialogTitle: "An error ocurred",
                dialogContent: <div className="dialog-content"><Error color="secondary"/>{error.response.data.message}</div>,
                dialogActions: <Button variant="contained" color="primary" onClick={this.handleOnClose}>Oh no</Button>,
                isError: true,
            });
        });
    }

    render()
    {
        return(
            this.state.isRedirect ? <Redirect to="/home"/> :
            <div className='login-form-wrapper'>
                <Dialog open={this.state.isCreateDialogOpen}>
                    <DialogTitle>{this.state.dialogTitle}</DialogTitle>
                    {this.state.dialogContent}
                    <DialogActions>
                        {this.state.dialogActions}
                    </DialogActions>
                </Dialog>
                <form className='login-form' onSubmit={this.handleSubmit}>
                    <label className="login-label">
                        <Typist cursor={{show:false}} avgTypingDelay={175}>
                            Login
                        </Typist>
                    </label>
                    <TextField className="login-form-input" name="username" onChange={this.handleChange} autoFocus label="Username" size="medium" color="secondary"/><br></br>
                    <TextField className="login-form-input" name="password" onChange={this.handleChange} type="password" label="Password" size="medium" color="secondary"/><br></br>
                    <Button className="button-login-form-input" type="submit" variant="contained" color="primary">Log In</Button>
                </form>
            </div>
        );
    }
}

export default Login;