import React, {Component} from 'react';
import './index.css';

class Nav extends Component
{
    constructor()
    {
        super();
        this.clickLogin = this.clickLogin.bind(this);
        this.scrolledNav = this.scrolledNav.bind(this);
        window.addEventListener("scroll", this.scrolledNav);
    }

    clickLogin()
    {
        document.getElementsByClassName("loginForm")[0].style.display = "flex";
        document.getElementsByClassName("loginForm")[0].style.animationName = "fadein";
    }

    scrolledNav()
    {
        if(window.scrollY >= 50)
        {
            document.getElementsByClassName("navBar")[0].style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
            document.getElementsByClassName("navBar")[0].style.backgroundColor = "White";
        }
        else
        {
            document.getElementsByClassName("navBar")[0].style.boxShadow = "none";
            document.getElementsByClassName("navBar")[0].style.backgroundColor = "transparent";
        }
    }

    render()
    {
        return(
            <nav className='navBar'>
                <a href="http://dandoalpha.000webhostapp.com/"><span className='navLogo'>&amp;</span></a>
                <ul>
                    <li className='loginButton' onClick={this.clickLogin}>Login</li>
                </ul>
            </nav>
        );
    }   
}

export default Nav;