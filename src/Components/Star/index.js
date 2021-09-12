import React, {Component} from 'react';
import Plx from 'react-plx';

import './index.css';

class Star extends Component
{
  render()
  {
    const starStyle = {
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${2 + Math.random() * 8}s`,

    }

    const starWrapperStyle = {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transform: `scale(${0.25 + Math.random() * 0.75})`,
    }

    const parallaxData = [
        {
          start: 0,
          end: 1000,
          properties: [
            {
              startValue: 0,
              endValue: -Math.random() * 1000,
              property: 'translateY',
            },
          ],
        },
      ];

    return(
        <div className='star-wrapper' style={starWrapperStyle}>
          <Plx  parallaxData={parallaxData}>
              <div className='star-component' style={starStyle}></div>
          </Plx>
        </div>
    );
  }
}

export default Star;