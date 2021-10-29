import React, {Component} from 'react';
import Tilt from 'react-tilt';
import { Carousel } from 'react-responsive-carousel';
import Clock from 'react-live-clock';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import './index.scss';

class Weather extends Component{

    constructor(props){
        super(props);
        this.state = {
            forecastData: [],
        }
    }

    async componentDidMount(){
        const forecastResponse = await fetch('https://api.weatherbit.io/v2.0/forecast/daily?days=7&city=' + this.props.city + '&country='  + this.props.country + '&key=686c003b089b4468bc5fe1bc22d8ec49');
        const forecastJson = await forecastResponse.json();

        this.setState({
            forecastData: forecastJson.data
        });
    }

    render(){
        return(
            <Tilt className='weather-container' options={{max:10, scale:1}}>
                <div className='weather-background'>
                    <h3>{this.props.city}</h3>
                    <Carousel className="forecast-carousel" showThumbs={false} showStatus={false} showIndicators={false}>
                        {
                            this.state.forecastData.map(day => {
                                return(
                                    <span key={day.datetime} className="forecast-day">
                                        {day === this.state.forecastData[0] ? <div>Today</div> : null}
                                        {day === this.state.forecastData[1] ? <div>Tomorrow</div> : null}
                                        {day !== this.state.forecastData[0] && day !== this.state.forecastData[1] ? <Clock date={day.datetime} format={'dddd'}/> : null}
                                        <img className='weather-icon' alt='Weather Icon' src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}/>
                                        <h5>{`${day.temp} °C`}</h5>
                                        <h3>{day.weather.description}</h3>
                                    </span>
                                );
                            })
                        }
                    </Carousel>
                </div>
            </Tilt>
        );
    }
}

export default Weather;