import React, {Component} from 'react';
import { Paper } from '@material-ui/core';

import './index.css';

class Weather extends Component{

    constructor(props){
        super(props);
        this.state = {
            icon: '',
            temperature: '',
            weather: ''
        }
    }

    async componentDidMount(){
        const response = await fetch('https://api.weatherbit.io/v2.0/current?city=' + this.props.city + '&country='  + this.props.country + '&key=686c003b089b4468bc5fe1bc22d8ec49');
        const responseJson = await response.json();
        this.setState({
            icon: responseJson.data[0].weather.icon,
            temperature: responseJson.data[0].temp,
            weather: responseJson.data[0].weather.description,
        });
    }

    render(){
        const iconSource = 'https://www.weatherbit.io/static/img/icons/' + this.state.icon + '.png';
        const temperature = this.state.temperature + ' °C';
        return(
            <Paper className='weatherContainer'>
                <h3>{this.props.city}</h3>
                <img className='weatherIcon' alt='Weather Icon' src={iconSource}/>
                <h5>{temperature}</h5>
                <h3>{this.state.weather}</h3>
            </Paper>
        );
    }
}

export default Weather;