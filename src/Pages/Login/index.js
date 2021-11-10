import { useState } from 'react';
import { TextField, Button, Snackbar, CircularProgress, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Typist from 'react-typist';

import Axios from '../../Core/Axios';

import './index.css';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

function Login(){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loginButtonContent, setLoginButtonContent] = useState("Log In");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState(null);

    const handleChange = (event) => {
        switch(event.target.name){
            case 'username':
                setUsername(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoginButtonContent(<CircularProgress color="secondary" size={24}/>);
    
        Axios.post('/users/authenticate', {
            username: username === '' ? null : username,
            password: password === '' ? null : password,
        }, {withCredentials: true})
        .then((response) => {
            console.log(response.data.message);
            console.log(response.data.user);
            setLoginButtonContent("Log In");
        })
        .catch((error) =>{
            setLoginButtonContent("Log In");
            console.log(error.response.data.message);
            setSnackBarMessage(error.response.data.message);
            setOpenSnackBar(true);
        });
    }

    return(
        <>
            <Snackbar TransitionComponent={SlideTransition} open={openSnackBar} autoHideDuration={3000} onClose={() => {setOpenSnackBar(false)}}>
                <Alert severity="error">{snackBarMessage}</Alert>
            </Snackbar>
            <form className='login-form' onSubmit={handleSubmit}>
                <label className="login-label">
                    <Typist cursor={{show:false}} avgTypingDelay={175}>
                        Login
                    </Typist>
                </label>
                <TextField className="login-form-input" name="username" onChange={handleChange} label="Username" size="medium" color="secondary" required/><br></br>
                <TextField className="login-form-input" name="password" onChange={handleChange} type="password" label="Password" size="medium" color="secondary" required/><br></br>
                <Button className="button-login-form-input" type="submit" variant="contained" color="primary">{loginButtonContent}</Button>
            </form>
        </>
    );
}

export default Login;