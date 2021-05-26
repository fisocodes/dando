import React, {Component} from 'react';
import './index.css';

class Login extends Component
{
    constructor()
    {
        super();
        this.exitLogin = this.exitLogin.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    exitLogin(event)
    {
        if(event.target === document.getElementsByClassName("loginForm")[0])
        {
            document.getElementsByClassName("loginForm")[0].style.animationName = "fadeout";
            setTimeout(() =>{document.getElementsByClassName("loginForm")[0].style.display = "none";}, 500);
        }
    }

    async loginHandler(event){
        event.preventDefault();
        const url = '/users';
        const response = await fetch(url);
        let data = await response.text();
        console.log(data);
        alert(data);
    }

    render()
    {
        return(
            <div className='loginForm' onClick={this.exitLogin}>
                <form onSubmit={this.loginHandler}>
                    <label>Login</label><br></br>
                    <input type="text" placeholder="Username"/><br></br>
                    <input type="password" placeholder="Password"/><br></br>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default Login;