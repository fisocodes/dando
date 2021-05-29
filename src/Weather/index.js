import React, {Component} from 'react';

import './index.css';

class Weather extends Component{

    constructor(props){
        super(props);
        this.state = {
            icon: '',
            weather: ''
        }
    }

    async componentDidMount(){
        const response = await fetch('http://api.weatherbit.io/v2.0/current?city=' + this.props.city + '&country='  + this.props.country + '&key=686c003b089b4468bc5fe1bc22d8ec49');
        const responseJson = await response.json();
        console.log(responseJson);
        this.setState({
            icon: responseJson.data[0].weather.icon,
            weather: responseJson.data[0].weather.description,
        });
    }

    render(){
        const iconSource = 'https://www.weatherbit.io/static/img/icons/' + this.state.icon + '.png';
        return(
            <div className='weatherContainer'>
                <h3>{this.props.city}</h3>
                <img className='weatherIcon' src={iconSource}/>
                <h3>{this.state.weather}</h3>
            </div>
        );
    }
}

export default Weather;