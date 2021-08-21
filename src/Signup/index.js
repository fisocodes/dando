import React, {Component} from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { CircularProgress} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { Redirect } from 'react-router';

import Axios from '../Axios';

import './index.css';

class Signup extends Component
{
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            name: "",
            surname: "",
            dob: "",
            isCreateDialogOpen: false,
            dialogTitle: "Creating user",
            dialogContent: <CircularProgress color="secondary"/>,
            dialogActions: null,
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value, 
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            isCreateDialogOpen: true,
        });

        Axios.post('/users/create', {
            username: this.state.username === '' ? null : this.state.username,
            password: this.state.password === '' ? null : this.state.password,
            name: this.state.name === '' ? null : this.state.name,
            surname: this.state.surname === '' ? null : this.state.surname,
            dob: this.state.dob === '' ? null : this.state.dob,
        })
        .then((response) => {
            
            this.setState({
                isCreateDialogOpen: true,
                dialogTitle: response.data,
                dialogContent: <CheckCircle color="secondary" fontSize="large"/>,
                dialogActions: <Button variant="contained" color="primary">Noice</Button>
            });
        })
        .catch(function(error){
            console.log(error);
        });
    }

    render()
    {
        return(
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
                        <label className="form-input">Sign Up</label>
                        <TextField name="username" required onChange={this.handleChange} className="form-input" autoFocus label="Username" size="medium" color="secondary"/><br></br>
                        <TextField name="password" required onChange={this.handleChange} className="form-input" type="password" label="Password" size="medium" color="secondary"/><br></br>
                        <TextField name="name" onChange={this.handleChange} className="form-input" label="Name" size="medium" color="secondary"/><br></br>
                        <TextField name="surname" onChange={this.handleChange} className="form-input" label="Surname" size="medium" color="secondary"/><br></br>
                        <TextField name="dob" onChange={this.handleChange} className="form-input" type="date" label="DOB" size="medium" color="secondary"/><br></br>
                        <Button className="form-input" type="submit" variant="contained" color="primary">Sign Up</Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default Signup;