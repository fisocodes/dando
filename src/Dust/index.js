import { Component } from 'react';

import './index.css';

class Dust extends Component {

    render(){

        const dustStyle = {
            left: `${Math.random() * 100- 30}vw`,
            top: `${Math.random() * 100 - 50}vh`,
            height: `${Math.random()* 600 + 300}`,
            width: `${Math.random()* 600 + 300}`,
            transform: `rotate(${Math.random()*360}deg)`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 7 + 5}s`,
        }

        const fill=`url(#${this.props.gradID})`;
        return(
            <svg className="galaxy-dust" style={dustStyle}>
                <radialGradient id={this.props.gradID}>
                    <stop offset="10%" stop-color={this.props.color} stop-opacity="1.0"/>
                    <stop offset="120%" stop-color="darkslateblue" stop-opacity="0.0"/>
                </radialGradient>
                <rect className="dust-shape" width="100%" height="100%" fill={fill}/>
            </svg>
        );
    }
}

export default Dust;