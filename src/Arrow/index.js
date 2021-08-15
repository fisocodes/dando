import React, {Component} from 'react';

class Arrow extends Component
{
    render()
    {
        return(
            <div className='arrowContainer'>
                <a href='#top'>
                <div className='arrowContent'>&#62;</div>
                </a>   
            </div>
        );
    }
}

window.onscroll = function()
{
    if(window.scrollY > 300)
    {
        //document.getElementsByClassName("arrowContainer")[0].style.display = "block";
    }
    else
    {
        //document.getElementsByClassName("arrowContainer")[0].style.display = "none";
    }
}

export default Arrow;