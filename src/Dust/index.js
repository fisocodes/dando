import { Component } from 'react';

import './index.css';

class Dust extends Component {

    render(){

        const dustStyle = {
            left: `${Math.floor(Math.random() * (100 - -100 + 1) ) + -100}%`,
            top: `${Math.floor(Math.random() * (100 - -100 + 1) ) + -100}px`,
            height: `${Math.random()* 500 + 300}`,
            width: `${Math.random()* 500 + 300}`,
            transform: `rotate(${Math.random()*360}deg)`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 7 + 5}s`,
        }

        return(
            <svg className="galaxy-dust" style={dustStyle}>
                <radialGradient id={"RadialGradient1"}>
                    <stop offset="30%" stop-color="mediumvioletred"stop-opacity="1.0"/>
                    <stop offset="120%" stop-color="darkslateblue" stop-opacity="0.0"/>
                </radialGradient>
                <rect className="dust-shape" width="100%" height="100%" fill="url(#RadialGradient1)"/>
            </svg>
        );
    }
}

export default Dust;