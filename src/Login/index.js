import React, {Component} from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { CircularProgress} from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';
import { Redirect } from 'react-router';

import Axios from '../Axios';

import './index.css';

class Login extends Component
{
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            isCreateDialogOpen: false,
            dialogTitle: "Loging In",
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
            dialogTitle: "Loging In",
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
        })
        .then((response) => {
            
            this.setState({
                dialogTitle: response.data,
                dialogContent: <CheckCircle color="secondary" fontSize="large"/>,
                dialogActions: <Button variant="contained" color="primary" onClick={this.handleOnClose}>Noice</Button>,
                isError: false,
            });

            console.log(response);
        })
        .catch((error) =>{
            this.setState({
                dialogTitle: "An error ocurred",
                dialogContent: <div className="dialog-content"><Error color="secondary"/>{error.response.data}</div>,
                dialogActions: <Button variant="contained" color="primary" onClick={this.handleOnClose}>Oh no</Button>,
                isError: true,
            });
            console.log(error.response.data);
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
                <Paper className="login-paper">
                    <form className='login-form' onSubmit={this.handleSubmit}>
                        <label className="form-input">Login</label>
                        <TextField className="form-input" name="username" onChange={this.handleChange} autoFocus label="Username" size="medium" color="secondary"/><br></br>
                        <TextField className="form-input" name="password" onChange={this.handleChange} type="password" autofocus label="Password" size="medium" color="secondary"/><br></br>
                        <Button className="form-input" type="submit" variant="contained" color="primary">Log In</Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default Login;