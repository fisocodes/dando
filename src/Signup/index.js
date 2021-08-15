import React, {Component} from 'react';
import { Paper, TextField, Button } from '@material-ui/core';

import './index.css';

class Signup extends Component
{
    render()
    {
        return(
            <div className='login-form-wrapper'>
                <Paper className="login-paper">
                    <form className='login-form'>
                        <label className="form-input">Sign Up</label>
                        <TextField className="form-input" autoFocus label="Username" size="medium" color="secondary"/><br></br>
                        <TextField className="form-input" type="password" label="Password" size="medium" color="secondary"/><br></br>
                        <TextField className="form-input" label="Name" size="medium" color="secondary"/><br></br>
                        <TextField className="form-input" label="Surname" size="medium" color="secondary"/><br></br>
                        <TextField className="form-input" type="date" size="medium" color="secondary"/><br></br>
                        <Button className="form-input" type="submit" variant="contained" color="primary">Log In</Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default Signup;