import React, {Component} from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import { CircularProgress} from '@material-ui/core';

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
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value, 
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        alert(`USER DATA\nUsername: ${this.state.username}\nPassword: ${this.state.password}\nName: ${this.state.name}\nSurname: ${this.state.surname}\nDOB: ${this.state.dob}\n`);

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
                isCreateDialogOpen: false,
            });

            alert(response.data);
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
                    <DialogTitle>Creating user</DialogTitle>
                    <CircularProgress color="secondary"/>
                </Dialog>
                <Paper className="login-paper">
                    <form className='login-form' onSubmit={this.handleSubmit}>
                        <label className="form-input">Sign Up</label>
                        <TextField name="username" required onChange={this.handleChange} className="form-input" autoFocus label="Username" size="medium" color="secondary"/><br></br>
                        <TextField name="password" required onChange={this.handleChange} className="form-input" type="password" label="Password" size="medium" color="secondary"/><br></br>
                        <TextField name="name" onChange={this.handleChange} className="form-input" label="Name" size="medium" color="secondary"/><br></br>
                        <TextField name="surname" onChange={this.handleChange} className="form-input" label="Surname" size="medium" color="secondary"/><br></br>
                        <TextField name="dob" onChange={this.handleChange} className="form-input" type="date" label="DOB" size="medium" color="secondary"/><br></br>
                        <Button className="form-input" type="submit" variant="contained" color="primary">Log In</Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default Signup;