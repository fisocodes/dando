import React, {Component} from 'react';
import { TextField, Button } from '@material-ui/core';
import { CircularProgress} from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';
import Typist from 'react-typist';
import { Carousel } from 'react-responsive-carousel';

import Axios from '../../Core/Axios';

import './index.scss';

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
            token: "",
            isCreateDialogOpen: false,
            dialogTitle: "Creating user",
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
            dialogTitle: "Creating user",
            dialogContent: <CircularProgress color="secondary"/>,
            dialogActions: null,
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
            token: this.state.token === '' ? null : this.state.token,
        })
        .then((response) => {          
            this.setState({
                dialogTitle: response.data,
                dialogContent: <CheckCircle color="secondary" fontSize="large"/>,
                dialogActions: <Button variant="contained" color="primary" onClick={this.handleOnClose}>Noice</Button>,
                isError: false,
            });
        })
        .catch((error) =>{
            this.setState({
                dialogTitle: "An error ocurred",
                dialogContent: <div className="dialog-content"><Error color="secondary"/>{error.response.data}</div>,
                dialogActions: <Button variant="contained" color="primary" onClick={this.handleOnClose}>Oh no</Button>,
                isError: true,
            });
        });
    }

    render()
    {
        return(
            <div className="signup-form-wrapper">
                <Typist cursor={{show:false}} avgTypingDelay={175}>
                    <label className="signup-title-label">Sign Up</label>
                </Typist>
                <form className='signup-form' onSubmit={this.handleSubmit}>
                    <Carousel className="signup-form-carousel" showThumbs={false} showStatus={false} showIndicators={false}>
                        <div className="signup-form-step">
                            <h3>You need a super username</h3>
                            <TextField name="username" required onChange={this.handleChange} className="signup-form-input" label="Username" size="medium" color="secondary"/>
                        </div>
                        <div className="signup-form-step">
                            <h3>Your password must be secret</h3>
                            <TextField name="password" required onChange={this.handleChange} className="signup-form-input" type="password" label="Password" size="medium" color="secondary"/>
                        </div>
                        <div className="signup-form-step">
                            <h3>What's your name?</h3>
                            <TextField name="name" required onChange={this.handleChange} className="signup-form-input" label="Name" size="medium" color="secondary"/>
                        </div>
                        <div className="signup-form-step">
                            <h3>What about your surname?</h3>
                            <TextField name="surname"  required onChange={this.handleChange} className="signup-form-input" label="Surname" size="medium" color="secondary"/>
                        </div>
                        <div className="signup-form-step">
                            <h3>When were you born?</h3>
                            <TextField name="dob" required onChange={this.handleChange} className="signup-form-input" type="date" size="medium" color="secondary"/>
                        </div>
                        <div className="signup-form-step">
                            <h3>Finally, I need a token</h3>
                            <TextField name="token" onChange={this.handleChange} className="signup-form-input" type="password" required label="Token" size="medium" color="secondary"/>
                        </div >
                    </Carousel>
                    <Button className="signup-form-input-button" type="submit" variant="contained" color="primary">Sign Up</Button>
                </form>
            </div>
        );
    }
}

export default Signup;