import { Component } from 'react';

import './index.css';

class Dust extends Component {

    render(){

        const dustStyle = {
            left: `${Math.random() * 100- 30}vw`,
            top: `${Math.random() * 100 - 50}vh`,
            height: `${Math.random()* 100 + 50}vh`,
            width: `${Math.random()* 100 + 50}vh`,
            transform: `rotate(${Math.random()*360}deg)`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 7 + 5}s`,
        }

        const fill=`url(#${this.props.gradID})`;
        return(
            <svg className="galaxy-dust" style={dustStyle}>
                <radialGradient id={this.props.gradID}>
                    <stop offset="10%" stopColor={this.props.color} stopOpacity="1.0"/>
                    <stop offset="120%" stopColor="darkslateblue" stopOpacity="0.0"/>
                </radialGradient>
                <rect className="dust-shape" width="100%" height="100%" fill={fill}/>
            </svg>
        );
    }
}

export default Dust;