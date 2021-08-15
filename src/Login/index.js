import React, {Component} from 'react';
import './index.css';

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.exitLogin = this.exitLogin.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    exitLogin(event)
    {
        if(event.target === document.getElementsByClassName("loginFormWrapper")[0])
        {
            document.getElementsByClassName("loginFormWrapper")[0].style.animationName = "fadeout";
            setTimeout(() =>{document.getElementsByClassName("loginFormWrapper")[0].style.display = "none";}, 500);
        }
    }

    async loginHandler(event){
        event.preventDefault();
        const username = document.getElementById('userNameInput').value;
        const password = document.getElementById('passwordInput').value;
        const main = this.props.main;
        
        if((username === 'fiso' && password === 'sotooscar1') || (username === 'korraline' && password === 'puikuan8+')){
            main.setState({
                auth: true
            });

            console.log(main.state.auth);
        }
    }

    render()
    {
        return(
            <div className='loginFormWrapper' onClick={this.exitLogin}>
                <form className='loginForm' onSubmit={this.loginHandler}>
                    <label className='loginLabel'>Login</label><br></br>
                    <input id='userNameInput' type="text" name='username' placeholder="Username"/><br></br>
                    <input id='passwordInput' type="password" nasme='password' placeholder="Password"/><br></br>
                    <input type="submit"/>
                </form>
                <a href="/sign-up">Sign Up</a>
            </div>
        );
    }
}

export default Login;