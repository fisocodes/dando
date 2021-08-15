import React, {Component} from 'react';
import { Paper, TextField, Button } from '@material-ui/core';

import './index.css';

class Login extends Component
{
    render()
    {
        return(
            <div className='login-form-wrapper'>
                <Paper className="login-paper">
                    <form className='login-form'>
                        <label className="form-input">Login</label>
                        <TextField className="form-input" autofocus label="Username" size="medium" color="secondary"/><br></br>
                        <TextField className="form-input" type="password" autofocus label="Password" size="medium" color="secondary"/><br></br>
                        <Button className="form-input" variant="contained" color="primary">Log In</Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default Login;