import React, {Component} from 'react';
import './index.css';

class Star extends Component
{
    componentDidMount()
    {
        let star = document.getElementsByClassName("starComponent");

        for(let i = 0; i < star.length; i++)
        {
            let x = Math.floor(Math.random()*star[i].parentElement.offsetWidth);
            let y = Math.floor(Math.random()*star[i].parentElement.offsetHeight);
            let delay = Math.random()*8;
            let duration = 2 + Math.random()*8;
            let scale = 0.25 + Math.random() * 0.5;
            star[i].style.left = x +'px';
            star[i].style.top = y-25 +'px';
            star[i].style.animationDelay = delay +'s';
            star[i].style.animationDuration = duration +'s';
            star[i].style.transform = 'scale(' + scale + ')';
        }
    }

    render()
    {
        return(
            <div className='starComponent'>

            </div>
        );
    }
}

export default Star;