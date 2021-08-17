import React, {Component} from 'react';

import Star from '../Star';

import './index.css';

class Header extends Component
{ 
    render()
    {
        return(
            <header id='top'>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <h1>D&amp;O</h1>
                <h2>Welcome to our website</h2>
                <h2 className='pointer'><a href='#statistics'>&#62;</a></h2>
            </header>
        );
    }
}

export default Header;