import React, {Component} from 'react';
import Plx from 'react-plx';

import './index.css';

class Star extends Component
{
  constructor(){
    super();
    this.state = {
      starWrapperStyle: null,
    }
  }

  componentDidMount(){
    this.setState({
      starWrapperStyle: {
        top: `${Math.random() * document.querySelector('#overviewContainer').clientHeight}px`,
        left: `${Math.random() * 100 }%`,
        transform: `scale(${0.25 + Math.random() * 0.75})`,
      }
    });
  }

  render()
  {
    const starStyle = {
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${2 + Math.random() * 8}s`,

    }

    const parallaxData = [
        {
          start: 0,
          end: 3000,
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
        <div className='star-wrapper' style={this.state.starWrapperStyle}>
          <Plx  parallaxData={parallaxData}>
              <div className='star-component' style={starStyle}></div>
          </Plx>
        </div>
    );
  }
}

export default Star;